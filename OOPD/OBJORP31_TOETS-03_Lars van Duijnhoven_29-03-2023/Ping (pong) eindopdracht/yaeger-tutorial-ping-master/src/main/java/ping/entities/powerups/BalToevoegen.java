package ping.entities.powerups;

import java.util.Random;
import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collider;


public class BalToevoegen extends PowerUp{
    public static int aantalBallen;
	private Random rand = new Random();

    public BalToevoegen(String resource, Coordinate2D initialLocation, Size size) {
        super(resource, initialLocation, size);
        aantalBallen = 1;
		setMotionPowerUp();
    }
    
    // Zorg ervoor dat er een nieuwe bal spawnt.
    public void doPowerUp(Collider collidingObject){
    	aantalBallen++;
    	PowerUpSpawner.spawnNewBal();
    	
		// Haalt de powerups van het scherm
    	remove();
    }
    
    public static int getAantalBallen(){
        return aantalBallen;
    }
    
	public static void SetAantalBallen(int waarde) {
		aantalBallen = waarde;
	}
    
    // Zorg dat als de powerups spawnt, dat deze naar links of rechts gaat bewegen
	@Override
	public void setMotionPowerUp() {
		int random = rand.nextInt(2);
		if (random == 0) {
			setMotion(1, 90d);
		} else {
			setMotion(1, 270d);
		}
	}

}
