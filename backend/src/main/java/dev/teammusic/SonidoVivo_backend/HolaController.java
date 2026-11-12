package dev.teammusic.SonidoVivo_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HolaController {

    @GetMapping("/")
    public String inicio() {
        return "SonidoVivo backend funcionando";
    }
}
