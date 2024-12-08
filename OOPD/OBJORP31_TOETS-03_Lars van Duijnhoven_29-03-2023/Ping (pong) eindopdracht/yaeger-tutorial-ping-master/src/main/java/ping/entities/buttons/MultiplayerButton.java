package ping.entities.buttons;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.impl.TextEntity;
import com.github.hanyaeger.api.userinput.MouseButtonPressedListener;
import com.github.hanyaeger.api.userinput.MouseEnterListener;
import com.github.hanyaeger.api.userinput.MouseExitListener;

import javafx.scene.Cursor;
import javafx.scene.input.MouseButton;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import ping.Ping;

public class MultiplayerButton extends TextEntity
		implements MouseButtonPressedListener, MouseEnterListener, MouseExitListener {

	private Ping ping;

	public MultiplayerButton(Coordinate2D initialLocation, Ping ping) {
		super(initialLocation, "Multiplayer");
		this.ping = ping;
		setFill(Color.GREEN);
		setFont(Font.font("Roboto", FontWeight.BOLD, 30));
	}

	// Zet het scherm naar het multiplayer speel scherm en zet speleraantal naar 2
	@Override
	public void onMouseButtonPressed(MouseButton button, Coordinate2D coordinate2D) {
		ping.setActiveScene(1);
		ping.setSpelerAantal(2);
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
