package ping.entities.scorebord;

import com.github.hanyaeger.api.Coordinate2D;
import com.github.hanyaeger.api.entities.impl.TextEntity;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

public class ScoreTekst extends TextEntity{

	private int puntenAantal;

    public ScoreTekst(Coordinate2D initialPosition) {
        super(initialPosition);

        setFont(Font.font("Roboto", FontWeight.BOLD, 50));
        setFill(Color.GOLD);
    }
    
    // Pas de text aan naar wat meegegeven wordt.
    public void setPuntenText(final int punten) {
    	puntenAantal = punten;
        setText("" + punten);
    }
}

