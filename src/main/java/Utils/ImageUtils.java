package Utils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.http.Part;

/**
 *
 * @author eliam
 */
public class ImageUtils {
    
    private static String path = "images\\";
    
    public static String uploadImage(Part image, String relativePath) throws IOException {
        
        String extension = image.getContentType().split("/")[1];
        String imageName = image.getName() + System.currentTimeMillis() + "." + extension;
        
        if (extension.equals("octet-stream")) {
            return null;
        }
        
        File file = new File(relativePath + path);
        if (!file.exists()) {
            file.mkdir();
        }
               
        String imagePath = relativePath + path + imageName;
        image.write(imagePath);
        
        return path + imageName;
        
    }
    
    public static boolean deleteImage() {
        return true;
    }
    
}
