package ping.entities.speler;

import java.util.Set;
import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collided;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.userinput.KeyListener;
import javafx.scene.input.KeyCode;
import ping.Ping;
import ping.entities.Border;

public class Speler1 extends SpelerRechthoek implements KeyListener, Collided, Collider {
	private static boolean inverted = false;
	public static int puntenAantal = 0;

	public Speler1(Coordinate2D location, Size size) {
		super(location, size);
	}

	@Override
	public void onPressedKeysChange(Set<KeyCode> pressedKeys) {
		
		// Als er maar 1 speler is, zorg dat alle controls de speler moeten kunnen bewegen.
		if (Ping.getSpelerAantal() == 1) {
			if (pressedKeys.contains(KeyCode.UP)) {
			setMotion(4, 180d);
			} else if (pressedKeys.contains(KeyCode.DOWN)) {
				setMotion(4, 0d);
			} else if (pressedKeys.contains(KeyCode.W)) {
				setMotion(4, 180d);
			} else if (pressedKeys.contains(KeyCode.S)) {
				setMotion(4, 0d);
			} else {
				setSpeed(0);
			}
		} 
		
		// Als de controls niet inverted moeten zijn, worden de controls W en S
		else if (Ping.getSpelerAantal() == 2 && !inverted) {
				if (pressedKeys.contains(KeyCode.W)) {
				setMotion(4, 180d);
			} else if (pressedKeys.contains(KeyCode.S)) {
				setMotion(4, 0d);
			} else {
				setSpeed(0);
			}
		} 
		
		// Als de controls inverted moeten zijn, worden de controls S en W
		else if (Ping.getSpelerAantal() == 2 && inverted) {
			if (pressedKeys.contains(KeyCode.S)) {
				setMotion(4, 180d);
			} else if (pressedKeys.contains(KeyCode.W)) {
				setMotion(4, 0d);
			} else {
				setSpeed(0);
			}
		}
	}
	
	// Zorg dat de controls omgedraaid (inverted) worden.
	public static void invert() {
		if (inverted) {
			inverted = false;
		} else {
			inverted = true;
		}
	}
	
	// Return de inverted state, zodat deze gereset kan worden indien nodig.
	public static boolean getInverted() {
		return inverted;
	}
	
	// Zorg ervoor dat de speler niet door de borders heen kan glitchen
	@Override
	public void onCollision(Collider collidingObject) {
		if (collidingObject instanceof Border) {
			if (this.getDirection() == 0) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX(),
						this.getAnchorLocation().getY() - 5);
				setAnchorLocation(locatie);
				setSpeed(0);
			} else if (this.getDirection() == 180) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX(),
						this.getAnchorLocation().getY() + 5);
				setAnchorLocation(locatie);
				setSpeed(0);
			}
		}
	}
	
	
	public void setPuntenAantal(int waarde) {
		puntenAantal = waarde;
	}
	
	public static int getPuntenAantal() {
		return puntenAantal;
	}
}
