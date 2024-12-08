package ping.scenes.multiplayer;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.impl.TextEntity;
import com.github.hanyaeger.api.scenes.StaticScene;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import ping.Ping;
import ping.entities.buttons.ExitButton;
import ping.entities.buttons.PlayAgainButton;
import ping.entities.buttons.SingleplayerButton;
import ping.entities.scorebord.ScoreTekst;
import ping.entities.speler.Speler1;
import ping.entities.speler.Speler2;


public class GameOverMultiplayer extends StaticScene{
	
	private ScoreTekst puntenSpeler1;
	private ScoreTekst puntenSpeler2;
	private Ping ping;
	private static int gewonnenSpeler;
	public GameOverMultiplayer(Ping ping) {
		this.ping = ping;
	}

	@Override
	public void setupScene() {
		setBackgroundImage("backgrounds/eindscherm_ping.png");
	}
	// Deze methode maakt alle objecten die gebruikt worden in het multiplayer game-over scherm aan.
	@Override
	public void setupEntities() {
		// Winnaar aangeven
	    var gewonnenText = new TextEntity(
		        new Coordinate2D(getWidth() / 4, getHeight() / 8 + 40),
		        "Speler " + gewonnenSpeler + " heeft gewonnen!"
		    );

		gewonnenText.setFont(Font.font("Roboto", FontWeight.BOLD, 50));
	    gewonnenText.setFill(Color.GOLDENROD);
	    
		// Knoppen aanmaken
	    PlayAgainButton playAgainButton =
				new PlayAgainButton(new Coordinate2D(getWidth()/3  , (getHeight()/2 - 20)), ping);
	    ExitButton exitButton =
				new ExitButton(new Coordinate2D(getWidth()/ 3 + 120, (getHeight()/2) + 150), ping);
		SingleplayerButton singleplayerButton =
				new SingleplayerButton(new Coordinate2D((getWidth()/8 * 3) + 55, (getHeight()/2) + 100), ping);

		// Knoppen laten zien
		addEntity(singleplayerButton);
		addEntity(gewonnenText);
	    addEntity(exitButton);
	    addEntity(playAgainButton);

	    // Punten voor beide spelers aanmaken en laten zien
	    puntenSpeler1 = new ScoreTekst(new Coordinate2D(getWidth()/2-22, getHeight()/4 + 15));
		addEntity(puntenSpeler1);
		
		puntenSpeler2 = new ScoreTekst(new Coordinate2D(getWidth()/2-22, getHeight()/3 + 15));
		addEntity(puntenSpeler2);

		puntenSpeler1.setPuntenText(Speler1.getPuntenAantal());
		puntenSpeler2.setPuntenText(Speler2.getPuntenAantal()); 
	}
	
	// Zorgt dat de winaar op het game over scherm wordt gezet
	public static void setGewonnenSpeler(int waarde) {
		gewonnenSpeler = waarde;
	}
}
