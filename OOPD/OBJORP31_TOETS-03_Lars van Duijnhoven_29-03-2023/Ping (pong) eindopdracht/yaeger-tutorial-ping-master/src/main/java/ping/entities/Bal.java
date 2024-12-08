package ping.entities;

import java.util.Random;
import java.util.Set;
import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.Size;
import com.github.hanyaeger.api.entities.Collided;
import com.github.hanyaeger.api.entities.Collider;
import com.github.hanyaeger.api.entities.SceneBorderTouchingWatcher;
import com.github.hanyaeger.api.entities.impl.DynamicSpriteEntity;
import com.github.hanyaeger.api.scenes.SceneBorder;
import com.github.hanyaeger.api.userinput.KeyListener;
import javafx.scene.input.KeyCode;
import ping.Ping;
import ping.entities.speler.Speler1;
import ping.entities.speler.Speler2;
import ping.entities.speler.SpelerRechthoek;
import ping.scenes.multiplayer.GameOverMultiplayer;
import ping.entities.powerups.BalToevoegen;
import ping.entities.scorebord.ScoreTekst;

public class Bal extends DynamicSpriteEntity implements Collided, SceneBorderTouchingWatcher, KeyListener {

	private static int aantalBalTouches = 0;
	private double richting;
	private Random rand = new Random();
	private Coordinate2D location;
	private static int balSnelheid;

	private Speler1 speler1;
	private Speler2 speler2;

	private ScoreTekst puntenSpeler1;
	private ScoreTekst puntenSpeler2;

	private Middenlijn middenlijn;

	private Ping ping;

	private boolean speler1Aangeraakt = false;
	private boolean speler2Aangeraakt = false;
//	private boolean muurAangeraakt = false;

	// Constructor bal multiplayer
	public Bal(Ping ping, String resource, Coordinate2D initialLocation, Size size, Speler1 speler1, Speler2 speler2,
			ScoreTekst puntenSpeler1, ScoreTekst puntenSpeler2, Middenlijn middenlijn) {
		super(resource, initialLocation, size);
		richting = getStartRichting();
		balSnelheid = 5;
		setMotion(balSnelheid, richting);
		this.ping = ping;
		this.location = initialLocation;
		this.speler1 = speler1;
		this.speler2 = speler2;
		this.puntenSpeler1 = puntenSpeler1;
		this.puntenSpeler2 = puntenSpeler2;
		this.middenlijn = middenlijn;
	}

	// Constructor bal singleplayer
	public Bal(Ping ping, String resource, Coordinate2D initialLocation, Size size, Speler1 speler1,
			ScoreTekst puntenSpeler1) {
		super(resource, initialLocation, size);
		richting = getStartRichting();
		balSnelheid = 5;
		setMotion(balSnelheid, richting);
		this.ping = ping;
		this.location = initialLocation;
		this.speler1 = speler1;
		this.puntenSpeler1 = puntenSpeler1;
	}

	public static void setBalSnelheid(int waarde) {
		balSnelheid = waarde;
	}

	public static int getBalSnelheid() {
		return balSnelheid;
	}
	
	// Geeft een random startrichting waar de bal naartoe gaat als deze net gespawnd is.
	public double getStartRichting() {
		double resultaat;
		int random = rand.nextInt(2);
		if (random == 0) {
			resultaat = 270d;
		} else {
			resultaat = 90d;
		}
		return resultaat + getAfwijking(5);
	}
	
	// Geeft een random getal wat de afwijking wordt. 
	public int getAfwijking(int aantal) {
		// Genereert een random getal van 0 en 1, als dit nul is, is de afwijking een plusgetal
		// en anders wordt dit een mingetal
		int random = rand.nextInt(2);
		int afwijking = rand.nextInt(aantal) + 1;
		if (random == 0) {
			return afwijking;
		} else {
			return -afwijking;
		}
	}

	public static int getAantalBalTouches() {
		return aantalBalTouches;
	}

	public void setAantalBalTouches(int aantalBalTouches) {
		Bal.aantalBalTouches = aantalBalTouches;
	}

	@Override
	public void onCollision(Collider collidingObject) {
		if (collidingObject instanceof Border) {
			
			// Dit zorgt er voor dat de bal niet door de border heen glitcht.
			if (richting > 270 || richting < 90) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX(),
						this.getAnchorLocation().getY() - 10);
				setAnchorLocation(locatie);
			} else if (richting <= 270 && richting >= 90) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX(),
						this.getAnchorLocation().getY() + 10);
				setAnchorLocation(locatie);
			}
			
			// Zorg dat de bal juist terugstuitert, hoe dit werkt is niet uit te leggen via text.
			if (richting <= 90 || richting >= 270) {
				richting = (270 - (richting - 270)) + getAfwijking(3);
			} else if ((richting > 90 && richting < 270)) {
				richting = (90 - (richting - 90)) + getAfwijking(3);
			}
			
			// Zorg dat de bal maximaal 359 en minimaal 0 graden op kan gaan.
			if (richting > 359) {
				richting -= 360;
			}
			setMotion(balSnelheid, richting);
		} else if (collidingObject instanceof SingleplayerMuur) {
			speler1Aangeraakt = false;
			
			// Dit zorgt er voor dat de bal niet door de muur heen glitcht.
			if (richting >= 0 && richting <= 180) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX() - 10,
						this.getAnchorLocation().getY());
				setAnchorLocation(locatie);
			} else if (richting > 180) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX() + 10,
						this.getAnchorLocation().getY());
				setAnchorLocation(locatie);
			}
			
			// Zorg dat de bal juist terugstuitert, hoe dit werkt is niet uit te leggen via text.
			if (richting <= 180 && richting >= 0) {
				richting = (360 - (richting - 0)) + getAfwijking(3);
			} else if (richting <= 360 && richting > 180) {
				richting = (180 - (richting - 180)) + getAfwijking(3);
			}
			
			// Zorg dat de bal maximaal 359 en minimaal 0 graden op kan gaan.
			if (richting > 359) {
				richting -= 360;
			} else if(richting < 0) {
				richting += 360;
			}
			setMotion(balSnelheid, richting);
		} else if (collidingObject instanceof SpelerRechthoek) {
			
			// Dit zorgt er voor dat de bal niet door de speler(s) heen glitcht.
			if (richting > 0 && richting < 180) {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX() - 10,
						this.getAnchorLocation().getY());
				setAnchorLocation(locatie);
			} else {
				Coordinate2D locatie = new Coordinate2D(this.getAnchorLocation().getX() + 10,
						this.getAnchorLocation().getY());
				setAnchorLocation(locatie);
			}

			
			// Zorg dat de bal juist terugstuitert, hoe dit werkt is niet uit te leggen via text.
			if ((richting > 45 && richting < 135) || (richting > 225 && richting < 315)) {
				richting += 180 + getAfwijking(40);
			} else {
				if (richting >= 0 && richting < 45) {
					richting -= 90 + getAfwijking(40);
				} else if (richting <= 360 && richting > 315) {
					richting += 90 + getAfwijking(40);
				} else if (richting >= 135 && richting <= 180) {
					richting += 90 + getAfwijking(40);
				} else if (richting <= 225 && richting > 180) {
					richting -= 90 + getAfwijking(40);
				}
			}
			
			// Zorg dat de bal maximaal 359 en minimaal 0 graden op kan gaan.
			if (richting > 359) {
				richting -= 360;
			} else if (richting < 0) {
				richting += 360;
			}
			setMotion(balSnelheid, richting);
			
			// Dit zorgt ervoor dat de baltouches alleen er bij worden getelt als dit legit 
			// wordt gedaan, niet met een bug en zorgt ook dat bij multiplayer de middenlijn 
			// breder wordt. De baltouches geldt voor multiplayer en singleplayer.
			if (Ping.getSpelerAantal() == 2) {
				if (collidingObject instanceof Speler1 && !speler1Aangeraakt) {
					speler1Aangeraakt = true;
					speler2Aangeraakt = false;
					aantalBalTouches++;
					middenlijn.middenlijnExpand(middenlijn.getWidth() + 10, 10);
				} else if (collidingObject instanceof Speler2 && !speler2Aangeraakt) {
					speler2Aangeraakt = true;
					speler1Aangeraakt = false;
					aantalBalTouches++;
					middenlijn.middenlijnExpand(middenlijn.getWidth() + 10, 10);
				}
			} else if (Ping.getSpelerAantal() == 1) {
				if (collidingObject instanceof Speler1 && !speler1Aangeraakt) {
					speler1Aangeraakt = true;
//					muurAangeraakt = false;
					aantalBalTouches++;
					balSnelheid += 1;
					speler1.setPuntenAantal(Speler1.getPuntenAantal() + 1);
					puntenSpeler1.setPuntenText(Speler1.getPuntenAantal());
				} 
			}
		}
	}

	
	@Override
	public void notifyBoundaryTouching(SceneBorder border) {
		if (Ping.getSpelerAantal() == 2) {
			// Als de bal een border raakt, wordt er hier gekeken aan welke speler punten
			// gegeven moet worden en wordt de bal gereset. Ook wordt er nog gekeken of er 
			// iemand heeft gewonnen.
			switch (border) {
			case LEFT:
				setAnchorLocation(location);
				richting = getStartRichting();
				setAantalBalTouches(0);
				setBalSnelheid(5);
				speler2.setPuntenAantal(Speler2.getPuntenAantal() + 1);
				puntenSpeler2.setPuntenText(Speler2.getPuntenAantal());
				if (BalToevoegen.getAantalBallen() > 1) {
					remove();
					BalToevoegen.SetAantalBallen(BalToevoegen.getAantalBallen() - 1);
				}
				if (checkGewonnen()) {
					GameOverMultiplayer.setGewonnenSpeler(2);
					ping.setActiveScene(2);
				}
				break;
			case RIGHT:
				setAnchorLocation(location);
				richting = getStartRichting();
				setAantalBalTouches(0);
				setBalSnelheid(5);
				speler1.setPuntenAantal(Speler1.getPuntenAantal() + 1);
				puntenSpeler1.setPuntenText(Speler1.getPuntenAantal());
				if (BalToevoegen.getAantalBallen() > 1) {
					remove();
					BalToevoegen.SetAantalBallen(BalToevoegen.getAantalBallen() - 1);
				}
				if (checkGewonnen()) {
					GameOverMultiplayer.setGewonnenSpeler(1);
					ping.setActiveScene(2);
				}
				break;
			default:
				break;
			}
		} else if (Ping.getSpelerAantal() == 1) {
			// Als het singleplayer is, moet het eindscherm van singleplayer komen, want de
			// persoon heeft dan verloren.
			switch (border) {
			case RIGHT:
				ping.setActiveScene(4);
				break;
			default:
				break;
			}
		}
	}

	@Override
	public void onPressedKeysChange(Set<KeyCode> pressedKeys) {
		// Als het multiplayer is en er wordt op de knop R gedrukt, moet de bal resetten.
		if (pressedKeys.contains(KeyCode.R) && Ping.getSpelerAantal() == 2) {
			setAnchorLocation(location);
			richting = getStartRichting();
			setAantalBalTouches(0);
			setBalSnelheid(5);
		}
	}
	
	// Controleer of er een speler heeft gewonnen.
	public boolean checkGewonnen() {
		if (Speler1.getPuntenAantal() >= 10 || Speler2.getPuntenAantal() >= 10) {
			return true;
		} else {
			return false;
		}
	}
}