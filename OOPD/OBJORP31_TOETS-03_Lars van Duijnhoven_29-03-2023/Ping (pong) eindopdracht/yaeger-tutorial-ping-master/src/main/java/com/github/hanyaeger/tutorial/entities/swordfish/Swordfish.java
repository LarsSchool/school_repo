package com.github.hanyaeger.tutorial.entities.swordfish;

import java.util.Random;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.SceneBorderCrossingWatcher;
import com.github.hanyaeger.api.entities.DynamicCompositeEntity;
import com.github.hanyaeger.api.scenes.SceneBorder;

public class Swordfish extends DynamicCompositeEntity implements SceneBorderCrossingWatcher {

	public Swordfish(Coordinate2D location){
	    super(location);
	    setMotion(2, 270d);
	}

	@Override
	public void notifyBoundaryCrossing(SceneBorder border){
	    setAnchorLocationX(getSceneWidth());
	    setAnchorLocationY(new Random().nextInt((int) getSceneHeight()- 80));
	}
	
	@Override
	protected void setupEntities() {
		// TODO Auto-generated method stub
	    SwordFishSprite swordFishSprite = new SwordFishSprite(new Coordinate2D(0,0));
	    addEntity(swordFishSprite);
	    HitBox hitBoxSwordFish = new HitBox(new Coordinate2D(0,40));
	    addEntity(hitBoxSwordFish);
	}

}
