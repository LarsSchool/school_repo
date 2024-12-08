package com.github.hanyaeger.tutorial.entities.map;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.impl.SpriteEntity;

public class Coral extends SpriteEntity implements Collider{
    public Coral(Coordinate2D location, Size size, String resource) {
        super(resource, location, size);
    }
}
