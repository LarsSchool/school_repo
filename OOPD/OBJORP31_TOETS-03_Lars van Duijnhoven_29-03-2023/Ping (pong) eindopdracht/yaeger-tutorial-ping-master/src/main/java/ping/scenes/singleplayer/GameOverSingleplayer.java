package ping.scenes.singleplayer;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.scenes.StaticScene;
import ping.Ping;
import ping.entities.buttons.ExitButton;
import ping.entities.buttons.MultiplayerButton;
import ping.entities.buttons.PlayAgainButton;
import ping.entities.scorebord.ScoreTekst;
import ping.entities.speler.Speler1;

public class GameOverSingleplayer extends StaticScene {
	private Ping ping;

	private ScoreTekst puntenSpeler1;

	public GameOverSingleplayer(Ping ping) {
		this.ping = ping;
	}

	@Override
	public void setupScene() {
		setBackgroundImage("backgrounds/eindscherm_ping.png");
	}

	// Deze methode maakt alle objecten die gebruikt worden in het singleplayer
	// game-over scherm aan.
	@Override
	public void setupEntities() {
		// Knoppen en punten aanmaken
		PlayAgainButton playAgainButton = new PlayAgainButton(new Coordinate2D(getWidth() / 3, 		(getHeight() / 2 - 20)),
				ping);

		ExitButton exitButton = new ExitButton(new Coordinate2D(getWidth() / 3 + 120, 		(getHeight() / 2) + 150), ping);

		MultiplayerButton multiplayerButton = new MultiplayerButton(
				new Coordinate2D((getWidth() / 8 * 3) + 55, (getHeight() / 2) + 100), ping);

		puntenSpeler1 = new ScoreTekst(new Coordinate2D(getWidth() / 2 - 22, getHeight() / 4));
		
		// Knoppen
		addEntity(playAgainButton);
		addEntity(exitButton);
		addEntity(multiplayerButton);

		// Punten
		addEntity(puntenSpeler1);
		puntenSpeler1.setPuntenText(Speler1.getPuntenAantal());
	}
}
