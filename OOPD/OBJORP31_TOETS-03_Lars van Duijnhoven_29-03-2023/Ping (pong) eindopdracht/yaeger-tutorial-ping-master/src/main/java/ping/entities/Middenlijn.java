package ping.entities;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.impl.DynamicRectangleEntity;
import javafx.scene.paint.Color;

public class Middenlijn extends DynamicRectangleEntity {
	
	public Middenlijn(Coordinate2D initialPosition, Size size) {
		super(initialPosition, size);
		setFill(Color.WHITE);
	}
	
	// Deze functie zorgt ervoor dan de middenlijn zich uitbreidt na elke baltouch.
	public void middenlijnExpand(double waarde, double waarde2) {
		this.setWidth(waarde);
		this.setAnchorLocationX(this.getAnchorLocation().getX() - (waarde2/2));
	}
	

}
