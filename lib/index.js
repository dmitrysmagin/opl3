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
    //Player: require('./lib/player'),
    Player: require('./main-player'),
    WorkletPlayer: require('./worklet-player')
};
