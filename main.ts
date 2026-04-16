namespace SpriteKind {
    export const Gas = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    darts = [assets.image`Dart1`, assets.image`Dart2`, img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 7 a a a 7 . . . . . . 
        . . . . . 9 5 a 5 9 . . . . . . 
        . . . . 9 5 5 a 5 5 9 . . . . . 
        . . . 9 5 5 5 a 5 5 5 9 . . . . 
        `]
    projectile = sprites.createProjectileFromSprite(darts._pickRandom(), mySprite, 0, -150)
    projectile.startEffect(effects.warmRadial, 200)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.coolRadial, 100)
    otherSprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
    if (info.score() == 10) {
        info.changeScoreBy(5)
        mySprite.sayText("+5 level up bonus", 2000, false)
        enemyspeed = 70
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.ashes, 200)
    scene.cameraShake(4, 500)
})
let baska_bi_uzay_teröristi: Sprite = null
let uzay_teröristi: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let darts: Image[] = []
let enemyspeed = 0
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 13)
mySprite = sprites.create(assets.image`Rocket`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
animation.runImageAnimation(
mySprite,
assets.animation`Flying Rocket`,
100,
true
)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -30, 0)
enemyspeed = 50
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 80)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2000, function () {
    uzay_teröristi = sprites.createProjectileFromSide(assets.image`Spider`, 0, enemyspeed)
    uzay_teröristi.x = randint(5, 155)
    uzay_teröristi.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    uzay_teröristi,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(500, function () {
    statusbar.value += -1
})
game.onUpdateInterval(500, function () {
    baska_bi_uzay_teröristi = sprites.createProjectileFromSide(assets.image`Stealth`, 0, enemyspeed)
    baska_bi_uzay_teröristi.x = randint(6, 156)
    baska_bi_uzay_teröristi.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    baska_bi_uzay_teröristi,
    assets.animation`Flying Stealth`,
    100,
    true
    )
})
