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

public class ExitButton extends TextEntity
		implements MouseButtonPressedListener, MouseEnterListener, MouseExitListener {

	private Ping ping;

	public ExitButton(Coordinate2D initialLocation, Ping ping) {
		super(initialLocation, "Exit Game");
		this.ping = ping;
		setFill(Color.RED);
		setFont(Font.font("Roboto", FontWeight.BOLD, 30));
	}

	// Dit sluit het programma af
	@Override
	public void onMouseButtonPressed(MouseButton button, Coordinate2D coordinate2D) {
		ping.quit();
	}
	
	
	// Veranderd de kleur naar oranje en laat zien dat je kan klikken
	@Override
	public void onMouseEntered() {
		setFill(Color.ORANGE);
		setCursor(Cursor.HAND);
	}
	
	
	// Veranderd de kleur weer terug
	@Override
	public void onMouseExited() {
		setFill(Color.RED);
		setCursor(Cursor.DEFAULT);
	}
}
