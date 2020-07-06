// class PlayerManager extends Behaviour {
//     warrior;
//     music = new AudioSystem();
//     video = new VideoSystem();
//     onStart() {
//         //示例1
//         this.warrior = core.getObjectById('image');
//         new Trigger(this.warrior, this.warrior);
//         //示例2
//         const map = new GameMapDesigner();
//         const isMapSet = map.setMap(["warrior", "monster", "tool", "wall"],
//             [1, 2, 3, 4],
//             ["../images/main***.png",
//                 "../images/main***.png",
//                 "../images/main***.png",
//                 "../images/main***.png"]);
//         if (isMapSet) {
//             console.log("获取到的指定角色图像为: " + map.getMap("tool"));
//             const walls = [];
//             const wallImagesNeeded = 34;
//             const wallSrc = map.getMap["wall"];
//             for (let i = 0; i < wallImagesNeeded; i++) {
//                 walls.push(wallSrc);
//             }
//         }
//         //示例3
//         this.music.audioPath = "./medias/bgMusic.mp3";
//         this.music.playAudio(false);
//         console.log("is audio ended? " + this.music.isAudioEnded());
//         //示例6
//         // this.video.videoPath = "./medias/sample_video.mp4";
//         // this.video.playVideo(false);
//         // console.log("is video ended? " + this.video.isVideoEnded());
//     }
//     onUpdate() {
//         //示例0
//         if (this.warrior.getBehaviour(Transform).x < 100) {
//             this.warrior.getBehaviour(Transform).x += 1;
//         }
//         //示例4
//         this.interaction();
//     }
// core.registerBehaviourClass(PlayerManager);
////////////////////////////////////////////////////////////////////////
// static map = [
//     // [
//     // 	[9,9,9,9,9,9,9,9,9,9,9,9,9],
//     // 	[9,1, 1, 1, 42, 0, 0, 1, 1, 1, 0, 51,9],
//     // 	[9,1, 0, 1, 1, 1, 0, 0, 0, 1, 2, 1,9],
//     // 	[9,65, 0, 1, 2, 1, 0, 63, 67, 1, 0, 0,9],
//     // 	[9,1, 0, 1, 0, 1, 0, 65, 68, 1, 0, 1,9],
//     // 	[9,1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1,9],
//     // 	[9,66, 0, 1, 0, 1, 2, 62, 66, 1, 1, 1,9],
//     // 	[9,1, 0, 1, 1, 2, 0, 0, 0, 0, 0, 1,9],
//     // 	[9,1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,9],
//     // 	[9,1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 0,9],
//     // 	[9,0, 0, 0, 0, 0, 0, 1, 0, 1, 48, 1,9],
//     // 	[9,3, 1, 61, 67, 1, 1, 1, 0, 0, 65, 43,9],
//     // 	[9,9,9,9,9,9,9,9,9,9,9,9,9],
//     // ],
//     // [
//     // 	[9,9,9,9,9,9,9,9,9,9,9,9,9],
//     // 	[9,1, 67, 1, 0, 67, 61, 62, 0, 1, 1, 1,9],
//     // 	[9,66, 1, 68, 0, 66, 1, 66, 0, 67, 1, 65,9],
//     // 	[9,1, 1, 1, 0, 1, 45, 1, 0, 1, 41, 1,9],
//     // 	[9,0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0,9],
//     // 	[9,1, 42, 1, 2, 43, 1, 1, 44, 1, 1, 1,9],
//     // 	[9,1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,9],
//     // 	[9,45, 1, 46, 1, 1, 1, 1, 1, 1, 1, 1,9],
//     // 	[9,2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2,9],
//     // 	[9,1, 0, 1, 41, 1, 0, 1, 47, 1, 0, 1,9],
//     // 	[9,1, 0, 49, 1, 63, 0, 64, 1, 65, 0, 3,9],
//     // 	[9,51, 0, 61, 43, 62, 0, 1, 48, 1, 0, 52,9],
//     // 	[9,9,9,9,9,9,9,9,9,9,9,9,9],
//     // ],
//     [//1为路 0为墙 21石堆 22为门 3为人物 4x为怪物 5x为楼梯 6x为增益道具 67炸弹 68钥匙
//         [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
//         [9, 1, 1, 1, 1, 0, 1, 68, 68, 21, 1, 1, 1, 0, 51, 9],
//         [9, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 22, 1, 9],
//         [9, 1, 0, 1, 1, 1, 1, 1, 65, 0, 0, 1, 0, 0, 0, 9],
//         [9, 1, 0, 1, 1, 1, 1, 1, 1, 41, 0, 41, 0, 68, 1, 9],
//         [9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 42, 0, 1, 1, 9],
//         [9, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 22, 42, 1, 9],
//         [9, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 65, 9],
//         [9, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 22, 61, 1, 42, 9],
//         [9, 1, 0, 1, 1, 0, 0, 41, 1, 1, 1, 0, 1, 1, 1, 9],
//         [9, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 9],
//         [9, 1, 0, 0, 0, 0, 22, 0, 0, 1, 1, 1, 1, 1, 1, 9],
//         [9, 1, 1, 1, 1, 1, 1, 41, 68, 0, 1, 1, 1, 1, 1, 9],
//         [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 9],
//         [9, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 67, 1, 9],
//         [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
//     ],
// ];
