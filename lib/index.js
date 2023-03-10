module.exports = {
    OPL3: require('./opl3'),
    format: {
        LAA: require('./format/laa'),
        //MUS: require('./format/mus'),
        DRO: require('./format/dro'),
        IMF: require('./format/imf'),
        RAW: require('./format/raw'),
        RAD: require('./format/rad')
    },
    Player: require('./player'),
    WorkletPlayer: require('./worklet-player')
};
