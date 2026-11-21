const LED_ENDPOINT = 0x02;

export function Name() {
    return "XBOX Elite Wireless Controller Series 2";
}

export function Publisher() {
    return "slinkybuky";
}

export function VendorId() {
    return 0x045e;
}

export function ProductId() {
    return 0x0b00;
}

export function ImageUrl() {
    return "https://raw.githubusercontent.com/slinkybuky/XBelite-signalrgb/main/XBOX_Elite_Wireless_Controller_Series_2.png";
}

export function Type() {
    return "rawusb";
}

export function Size() {
    return [1, 1];
}

export function LedNames() {
    return ["Xbox Button"];
}

export function LedPositions() {
    return [[0, 0]];
}

export function Validate(endpoint) {
    return endpoint.interface === 0;
}

function SendPacket(packet) {
    device.bulk_transfer(
        LED_ENDPOINT,
        packet,
        packet.length,
        100
    );
}

export function Initialize() {
    SendPacket([0x4d, 0x10, 0x01, 0x01, 0x03]);
}

export function Render() {
    const color = device.color(0, 0);

    SendPacket([
        0x0e, 0x00, 0x02, 0x05, 0x00, 0x00,
        color[0], color[1], color[2]
    ]);
}

export function Shutdown() {
    SendPacket([
        0x0e, 0x00, 0x03, 0x05,
        0x01, 0x00,
        0x00, 0x00, 0x00
    ]);
}
