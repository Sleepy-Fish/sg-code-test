export default (function flame(){
    return {
        alpha: {
            list: [
                {
                    value: 1,
                    time: 0
                },
                {
                    value: 0.9,
                    time: 1
                },
            ],
            isStepped: false
        },
        scale: {
            list: [
                {
                    value: 0.2,
                    time: 0
                },
                {
                    value: 0.1,
                    time: 1
                }
            ],
            isStepped: false
        },
        color: {
            list: [
                {
                    value: "fff0d3",
                    time: 0
                },
                {
                    value: "ffc34f",
                    time: 0.3
                },
                {
                    value: "c94022",
                    time: 1
                },
            ],
            isStepped: false
        },
        speed: {
            list: [
                {
                    value: 180,
                    time: 0
                },
                {
                    value: 40,
                    time: 1
                }
            ],
            isStepped: false
        },
        startRotation: {
            min: 240,
            max: 300
        },
        rotationSpeed: {
            min: -360,
            max: 360
        },
        lifetime: {
            min: 2,
            max: 2
        },
        frequency: 0.3,
        spawnChance: 0.5,
        maxParticles: 5,
        pos: {
            x: window.innerWidth/2,
            y: window.innerHeight/2
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
            x: 0,
            y: -20,
            r: 20
        }
    }
})();