package ping;

import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.YaegerGame;
import ping.scenes.TitelScherm;
import ping.scenes.multiplayer.GameOverMultiplayer;
import ping.scenes.multiplayer.GameSchermMultiplayer;
import ping.scenes.singleplayer.GameOverSingleplayer;
import ping.scenes.singleplayer.GameSchermSingleplayer;

public class Ping extends YaegerGame{
	
	private static int spelerAantal;
	
	public static void main(String[] args){
	    launch(args);
	}

	@Override
	public void setupGame() {
	    setGameTitle("Ping");
	    setSize(new Size(1200, 750));
	}

	@Override
	public void setupScenes(){
	    addScene(0, new TitelScherm(this));
	    addScene(1, new GameSchermMultiplayer(this));
	    addScene(2, new GameOverMultiplayer(this));
	    addScene(3, new GameSchermSingleplayer(this));
	    addScene(4, new GameOverSingleplayer(this));
	}

	public void setSpelerAantal(int waarde) {
		spelerAantal = waarde;
	}
	
	public static int getSpelerAantal() {
		return spelerAantal;
	}
}