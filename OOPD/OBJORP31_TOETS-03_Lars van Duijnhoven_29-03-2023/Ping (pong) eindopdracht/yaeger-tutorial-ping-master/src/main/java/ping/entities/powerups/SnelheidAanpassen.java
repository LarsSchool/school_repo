package ping.entities.powerups;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collider;

import ping.entities.Bal;

public class SnelheidAanpassen extends PowerUp {

    public SnelheidAanpassen(String resource, Coordinate2D initialLocation, Size size) {
        super(resource, initialLocation, size);
		setMotionPowerUp();
    }
    
    // Zorgt ervoor dat de snelheid van de bal een random waarde tussen de 5 en 10 krijgt.
    // Als de random waarde hetzelfde is als de huidige snelheid, moet er opnieuw gerolt worden.
    public void doPowerUp(Collider collidingObject){
        int nieuweSnelheid = getRandom(5) + 5;
        while(nieuweSnelheid > 7 || nieuweSnelheid < 2 || Bal.getBalSnelheid() == nieuweSnelheid){
            nieuweSnelheid = getRandom(5) + 5;
        }
        Bal.setBalSnelheid(nieuweSnelheid);
        
		// Haalt de powerups van het scherm
    	remove();
    }
    
    // Zorg dat als de powerups spawnt, dat deze naar links of rechts gaat bewegen
	@Override
	public void setMotionPowerUp() {
		int random = getRandom(2);
		if (random == 0) {
			setMotion(1, 90d);
		} else {
			setMotion(1, 270d);
		}
	}
}
