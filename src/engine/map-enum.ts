//1为路 0为墙 21石堆 22为门 3为人物 4x为怪物 5x为楼梯 6x为增益道具 67炸弹 68钥匙
export enum GameMap {
    road = 1,
    wall = 0,
    border = 9,
    stones = 21,
    door = 22,
    charactor = 3,
    monster = 40 || 41 || 42 || 43 || 44 || 45 || 46 || 47 || 48 || 49,
    stairs = 50 || 51 || 52 || 53 || 54 || 55 || 56 || 57 || 58 || 59,
    tools = 60 || 61 || 62 || 63 || 64 || 66 || 66 || 69,
    key = 68,
    bomb = 67
}