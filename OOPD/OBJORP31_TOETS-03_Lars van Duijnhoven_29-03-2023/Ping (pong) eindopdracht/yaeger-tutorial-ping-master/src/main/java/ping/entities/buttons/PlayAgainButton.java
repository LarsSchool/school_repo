package ping.entities.buttons;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.impl.TextEntity;
import com.github.hanyaeger.api.userinput.MouseButtonPressedListener;
import com.github.hanyaeger.api.userinput.MouseEnterListener;
import com.github.hanyaeger.api.userinput.MouseExitListener;

import ping.Ping;
import ping.entities.speler.Speler1;
import ping.entities.speler.Speler2;
import javafx.scene.Cursor;
import javafx.scene.input.MouseButton;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

public class PlayAgainButton extends TextEntity
		implements MouseButtonPressedListener, MouseEnterListener, MouseExitListener {

	private Ping ping;

	public PlayAgainButton(Coordinate2D initialLocation, Ping ping) {
		super(initialLocation, "Play again");
		this.ping = ping;
		setFill(Color.GREEN);
		setFont(Font.font("Roboto", FontWeight.BOLD, 80));
	}
	
	// Zet de inverts terug naar normaal voor multiplayer en laat het multiplayer speel scherm weer zien
	// en zet het singleplayer speel scherm voor singleplayer.
	@Override
	public void onMouseButtonPressed(MouseButton button, Coordinate2D coordinate2D) {
		if (ping.getSpelerAantal() == 2) {
			ping.setActiveScene(1);

			if (Speler1.getInverted()) {
				Speler1.invert();
			}
			if (Speler2.getInverted()) {
				Speler2.invert();
			}
		} else if (ping.getSpelerAantal() == 1) {
			ping.setActiveScene(3);
		}
	}
	
	// Veranderd de kleur naar lichtgroen en laat zien dat je kan klikken
	@Override
	public void onMouseEntered() {
		setFill(Color.LIGHTGREEN);
		setCursor(Cursor.HAND);
	}
	
	// Veranderd de kleur weer terug
	@Override
	public void onMouseExited() {
		setFill(Color.GREEN);
		setCursor(Cursor.DEFAULT);
	}
}
