//Import some assets from Vortex we'll need.
const path = require('path');
const { fs, log, util } = require('vortex-api');
const GAME_ID = 'mechwarrior5mercenaries';
const EPIC_Identifyer = `Hoopoe`;
function main(context) {
	//This is the main function Vortex will run when detecting the game extension. 
    context.registerGame({
        id: GAME_ID,
        name: 'Mechwarrior 5',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => 'MW5Mercs/Mods', 
        logo: 'gameart.jpg',
        executable: () => 'MechWarrior.exe',
        requiredFiles: [
          'MechWarrior.exe'
        ],
        setup: prepareForModding,
      });
    

    return true
    

    function findGame() {
        return util.GameStoreHelper.findByAppId([EPIC_Identifyer])
            .then(game => game.gamePath);
      }
      function prepareForModding(discovery) {
        return fs.readdirAsync(path.join(discovery.path, 'MW5Mercs', 'Mods'));
    }
}

module.exports = {
    default: main,
  };