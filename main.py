def SetEnum():
    global _enum
    _enum = 0
    # A
    # 
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        _enum += 1
    # B
    if pins.digital_read_pin(DigitalPin.P12) == 0:
        _enum += 2
    # X
    if pins.digital_read_pin(DigitalPin.P11) == 0:
        _enum += 8
    # Y
    if pins.digital_read_pin(DigitalPin.P10) == 0:
        _enum += 16
    # Back(Select)
    if pins.digital_read_pin(DigitalPin.P16) == 0:
        _enum += 1024
    # Start
    if pins.digital_read_pin(DigitalPin.P14) == 0:
        _enum += 2048
    # L stick (L3)
    # 
    if pins.digital_read_pin(DigitalPin.P2) == 0:
        _enum += 8192
_enum = 0
led.enable(False)
pins.set_pull(DigitalPin.P2, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P3, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P4, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P5, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P6, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P7, PinPullMode.PULL_UP)
pins.set_pull(DigitalPin.P8, PinPullMode.PULL_UP)
serial.redirect_to_usb()
gamepad.start_gamepad_service()

def on_forever():
    while gamepad.is_enabled():
        SetEnum()
        gamepad.send(_enum,
            pins.map(pins.analog_read_pin(AnalogPin.P0), 0, 1023, -127, 127),
            pins.map(pins.analog_read_pin(AnalogPin.P1), 0, 1023, -127, 127),
            gamepad._dpad(GameDirection.NO_DIRECTION),
            0,
            0)
basic.forever(on_forever)
