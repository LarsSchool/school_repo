package ping.entities;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.impl.SpriteEntity;

public class Border extends SpriteEntity implements Collider{

	public Border(String resource, Coordinate2D location, Size size) {
		super(resource, location, size);
	}
}
