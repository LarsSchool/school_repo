package ping.entities.speler;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.impl.DynamicRectangleEntity;

public abstract class SpelerRechthoek extends DynamicRectangleEntity {

	public SpelerRechthoek(Coordinate2D initialLocation, Size size) {
		super(initialLocation, size);
	}
}
