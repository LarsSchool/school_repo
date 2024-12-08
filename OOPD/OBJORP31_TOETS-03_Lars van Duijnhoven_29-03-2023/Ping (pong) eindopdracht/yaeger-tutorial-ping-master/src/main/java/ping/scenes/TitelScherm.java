package ping.scenes;

import com.github.hanyaeger.api.AnchorPoint;
import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.impl.TextEntity;
import com.github.hanyaeger.api.scenes.StaticScene;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import ping.Ping;
import ping.entities.buttons.MultiplayerButton;
import ping.entities.buttons.SingleplayerButton;

public class TitelScherm extends StaticScene{
	private Ping ping;

	public TitelScherm(Ping ping){
	    this.ping = ping;
	}

	@Override
	public void setupScene(){
		setBackgroundImage("backgrounds/pong-video-game.gif");
	}

	// Deze methode zorgt ervoor dat de knoppen in het beeld komen
	@Override
	public void setupEntities(){
		
		// Text aanmaken
	    var pingText = new TextEntity(
	        new Coordinate2D(getWidth() / 2, getHeight() / 8),
	        "Ping"
	    );	    
	    
	    pingText.setFont(Font.font("Helvetica", 40));
	    
	    // Knoppen aanmaken
	    SingleplayerButton singleplayerButton =
				new SingleplayerButton(new Coordinate2D((getWidth()/8 * 3) + 50, (getHeight()/6 * 4) + 40), ping);

		MultiplayerButton multiplayerButton =
				new MultiplayerButton(new Coordinate2D((getWidth()/8 * 3) + 50, (getHeight()/6 * 4) + 100), ping);

		pingText.setAnchorPoint(AnchorPoint.CENTER_CENTER);

	    pingText.setFill(Color.ORANGE);

	    pingText.setFont(Font.font("Roboto", FontWeight.SEMI_BOLD, 80));
	    
		// Tekst laten zien
	    addEntity(pingText);
	    
		// Knoppen laten zien
	    addEntity(singleplayerButton);
		addEntity(multiplayerButton);
	}
}
