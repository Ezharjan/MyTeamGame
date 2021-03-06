class Behaviour {

    uuid = 0;

    $isDestroyed = false;
    $isExecutedOnStart = false;

    gameObject: GameObject = null;

    private static allBehaviours: { [uuid: number]: Behaviour } = {};

    private static behaviourUuidIndex = 1;



    constructor() {
        this.uuid = Behaviour.behaviourUuidIndex++;
        Behaviour.allBehaviours[this.uuid] = this;
    }

    static getBehaviour(uuid: number) {
        return this.allBehaviours[uuid];
    }

    onAddToGameObject() { }

    onStart() { }

    onUpdate(duration: number) { }

    onDestroy() { }
}


//Use Decorator
const SerializedField: (defaultValue?: any) => PropertyDecorator = (defaultValue: any) => {

    return (target, key) => {
        const clz = target.constructor;
        if (!clz['properties']) {
            clz['properties'] = [];
        }
        clz['properties'].push({ key: key, defaultValue: defaultValue });
    }
}


class Transform extends Behaviour {

    @SerializedField(0)
    x = 0;
    @SerializedField(0)
    y = 0;

    @SerializedField(1)
    scaleX = 1;
    @SerializedField(1)
    scaleY = 1;

    @SerializedField(0)
    rotation = 0;

    @SerializedField(1)
    alpha = 1;

    $globalAlpha = 1;

    $localMatrix;
    $globalMatrix;


    constructor() {
        super();
        this.$localMatrix = new Matrix();
        this.$globalMatrix = new Matrix();
    }

    calculateGlobalProperties() {
        if (!this.gameObject.parent) {
            return;
        }
        const parentTransform = this.gameObject.parent.getBehaviour(Transform);
        this.$localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        this.$globalMatrix = matrixMultipication(this.$localMatrix, parentTransform.$globalMatrix);
        this.$globalAlpha = parentTransform.$globalAlpha * this.alpha; //place here temporarily
    }
}


class ImageRenderer extends Behaviour {

    @SerializedField()
    image = null;


    onAddToGameObject() {
        this.gameObject.renderer = this;
    }

    onDraw(context) {

        const texture = getImage(this.image);

        if (texture) {
            context.drawImage(texture, 0, 0);
        }
    }

    hitCheck(point) {
        const texture = getImage(this.image);
        if (!texture) {
            return null;
        }
        const rectangle = { x: 0, y: 0, width: texture.width, height: texture.height };
        const result = isPointInRectangle(point, rectangle);
        if (result) {
            return this.gameObject;
        } else {
            return null;
        }
    }
}


class TextRenderer extends Behaviour {

    @SerializedField('black')
    color: string;
    @SerializedField('game engine')
    text: string;
    size = 20;

    $textPosX = 0;
    $textPosY = 17;


    onAddToGameObject() {
        this.gameObject.renderer = this;
    }

    onDraw(context) {
        context.fillStyle = this.color;
        context.font = this.size + 'px Arial';
        context.fillText(this.text, this.$textPosX, this.$textPosY, 400);
    }

    hitCheck(point) {
        const rectangle = { x: 0, y: 0, width: 100, height: 20 };
        const result = isPointInRectangle(point, rectangle);
        if (result) {
            return this.gameObject;
        } else {
            return null;
        }
    }
}


class RectRenderer extends Behaviour {

    @SerializedField(100)
    width: number;
    @SerializedField(100)
    height: number;
    @SerializedField('black')
    color: string



    onAddToGameObject() {
        this.gameObject.renderer = this;
    }


    onDraw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.moveTo(0, 0);
        context.lineTo(this.width, 0);
        context.lineTo(this.width, this.height);
        context.lineTo(0, this.height);
        context.lineTo(0, 0);
        context.fill();
        context.closePath();
    }


    hitCheck(point) {

        const rectangle = { x: 0, y: 0, width: this.width, height: this.height };
        const result = isPointInRectangle(point, rectangle);
        if (result) {
            return this.gameObject;
        } else {
            return null;
        }
    }
}


class Trigger extends Behaviour {

    objectA: any;
    objectB: any;

    constructor(objectA: any, objectB: any) {
        super();
        this.objectA = objectA;
        this.objectB = objectB;
        this.isTriggered();
    }

    isTriggered() {

        if ((this.objectA.getBehaviour(Transform).x == this.objectB.getBehaviour(Transform).x) &&
            (this.objectA.getBehaviour(Transform).y == this.objectB.getBehaviour(Transform).y)) {
            return true;
        }
        else {
            return false;
        }
    }
}


class GameMapDesigner extends Behaviour {


    rowCount;
    columnCount;
    rowIndex = 0;
    columnIndex = 0;

    mapContent = "";
    gameMap = new Dictionary();
    sourceMap = new Dictionary();

    // constructor(rowCount, columnCount) {
    //     super();
    //     this.columnCount = columnCount;
    //     this.rowCount = rowCount;
    // }

    setMap(roles: string[], indeies: number[], sources: string[]) {
        try {
            for (let i = 0; i < roles.length; i++) {
                this.gameMap.add(roles[i], indeies[i]);
                this.sourceMap.add(indeies[i], sources[i]);
            }
            return true;
        } catch (err) {
            alert("Error happened!");
            console.error("Error happened! --- " + err);
            return false;
        }
    }

    getMap(role: string) {
        const roleIndex = this.gameMap.find(role);
        const source = this.sourceMap.find(roleIndex);
        return source;
    }

    readMap(mapFile: string) {
        const d3 = require("d3");
        d3.json(mapFile, function (err, content) {
            err && console.log(err);
            this.mapContent = content;
            return this.mapContent;
        });
    }

    deleteRole(roleName: string) {
        try {
            this.gameMap.remove(roleName);
            this.sourceMap.remove(roleName);
            return true;
        }
        catch (err) {
            alert("Error happened!");
            console.error("Error happened! --- " + err);
            return false;
        }
    }
}


class ScoreInfoRenderer extends TextRenderer {

    prevText = "";

    onDraw(context) {
        if (this.prevText !== this.text) {
            context.font = this.size + 'px Arial';
            context.fillStyle = this.color;
            context.drawImage(images["./img/gamescore_background.png"], 0, 0);
            context.fillText(this.text, this.$textPosX, this.$textPosY, 400);

            this.prevText = this.text;
        }
    }
}
