package com.github.hanyaeger.tutorial.entities.bubbles;



import com.github.hanyaeger.api.Coordinate2D;
import javafx.scene.paint.Color;

public class AirBubble extends Bubble {

    public AirBubble(Coordinate2D initialLocation, double speed) {
        super(initialLocation, speed);
        setFill(Color.WHITE);
        setStrokeColor(Color.BLUE);
    }
}
