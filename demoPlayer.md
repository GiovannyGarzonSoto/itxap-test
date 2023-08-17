# Demo Player

Primero, necesitamos crear las clases MP3Audio y OGGAudio que implementen la interfaz IAudio:

```java
public class MP3Audio implements IAudio {
    public int duration;
    public int bitrate;

    public Byte[] getAudioStream() {
        // Lógica específica para archivos MP3
    }
}

public class OGGAudio implements IAudio {
    public int duration;
    public int bitrate;

    public Byte[] getAudioStream() {
        // Lógica específica para archivos OGG
    }
}
```

Luego, necesitamos extender la clase abstracta AudioPlayer y proporcionar la implementación para el método createAudioObj() en las subclases:

```java
public class DemoPlayer {
    private static AudioPlayer player;

    public static void main(String[] args) {
        configurar(args); // define el tipo de audio a utilizar
        playSong();
        // reproduce el audio
    }

    static void configurar(String[] args) {
        // si primer argumento del programa es ogg,
        // entonces preparar reproducción de audio de ese tipo
        if (args[0].equals("ogg")) {
            /* Es formato .ogg */
            player = new OGGAudioPlayer();
        } else {
            // sino, preparar reproducción de audio de tipo mp3 por defecto.
            /* Es formato .mp3 */
            player = new MP3AudioPlayer();
        }
    }

    static void playSong() {
        player.Play(); // invoca método Play() del reproductor de audios
    }
}

abstract class AudioPlayer {
    public void Play() {
        // business logic...
        IAudio audio = createAudioObj();
        // función que crea el objeto de audio
        PlayStream(audio.getAudioStream()); // obtiene stream de audio y reproduce
        // business logic...
    }

    public abstract IAudio createAudioObj();
}

class MP3AudioPlayer extends AudioPlayer {
    public IAudio createAudioObj() {
        return new MP3Audio();
    }
}

class OGGAudioPlayer extends AudioPlayer {
    public IAudio createAudioObj() {
        return new OGGAudio();
    }
}
```