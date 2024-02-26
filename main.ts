function SetEnum () {
    _enum = 0
    // A
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        _enum += 1
    }
    // B
    if (pins.digitalReadPin(DigitalPin.P12) == 0) {
        _enum += 2
    }
    // X
    if (pins.digitalReadPin(DigitalPin.P11) == 0) {
        _enum += 8
    }
    // Y
    if (pins.digitalReadPin(DigitalPin.P10) == 0) {
        _enum += 16
    }
    // Back(Select)
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        _enum += 1024
    }
    // Start
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        _enum += 2048
    }
    // L stick (L3)
    if (pins.digitalReadPin(DigitalPin.P2) == 0) {
        _enum += 8192
    }
}
let _enum = 0
led.enable(false)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P3, PinPullMode.PullUp)
pins.setPull(DigitalPin.P4, PinPullMode.PullUp)
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
pins.setPull(DigitalPin.P6, PinPullMode.PullUp)
pins.setPull(DigitalPin.P7, PinPullMode.PullUp)
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
serial.redirectToUSB()
gamepad.startGamepadService()
basic.forever(function () {
    while (gamepad.isEnabled()) {
        SetEnum()
        gamepad.send(
        _enum,
        pins.map(
        pins.analogReadPin(AnalogPin.P0),
        0,
        1023,
        -127,
        127
        ),
        pins.map(
        pins.analogReadPin(AnalogPin.P1),
        0,
        1023,
        -127,
        127
        ),
        gamepad._dpad(GameDirection.noDirection),
        0,
        0
        )
    }
})
