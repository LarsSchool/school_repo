package ping.entities.powerups;

import java.util.Random;
import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collided;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.impl.DynamicSpriteEntity;
import ping.entities.Bal;

public abstract class  PowerUp extends DynamicSpriteEntity implements Collided {
    public int aantalBalTouches;
    
    private Random rand = new Random();
    
    public PowerUp(String resource, Coordinate2D initialLocation, Size size) {
        super(resource, initialLocation, size);
        aantalBalTouches = Bal.getAantalBalTouches();
    }
    
    // Als de powerups opgepakt wordt, moet de powerups uitgevoerd worden.
    @Override
    public void onCollision(Collider collidingObject) {
    	doPowerUp(collidingObject);
    }
    
    // Een functie die een random waarde returnt, omdat er anders elke keer een variabele Random/ rand
    // aangemaakt zou moeten worden, wat niet heel mooi/ handig is.
    public int getRandom(int waarde) {
		return rand.nextInt(waarde);
    }

    public abstract void doPowerUp(Collider collidingObject);
    
    public abstract void setMotionPowerUp();
}
