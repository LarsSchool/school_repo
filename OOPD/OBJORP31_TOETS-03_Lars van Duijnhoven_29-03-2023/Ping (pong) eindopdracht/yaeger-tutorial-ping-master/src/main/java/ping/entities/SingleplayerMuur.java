package ping.entities;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.impl.DynamicRectangleEntity;
import javafx.scene.paint.Color;

public class SingleplayerMuur extends DynamicRectangleEntity implements Collider{

	public SingleplayerMuur(Coordinate2D initialPosition, Size size) {
		super(initialPosition, size);
		setFill(Color.DARKGREEN);
	}

}
