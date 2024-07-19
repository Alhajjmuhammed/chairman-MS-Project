package com.alhajj.cms.config;

import com.alhajj.cms.model.dto.UserDto;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthProvider {
//    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey = "fhhghghghgfhgfhgfhffghfghgfhfghgfhfghfghfghfghfghffg";
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDto userDto) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(userDto.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("email", userDto.getEmail())
                .withClaim("role", userDto.getRole())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public UsernamePasswordAuthenticationToken validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decoded = verifier.verify(token);

        UserDto user = UserDto.builder()
                .username(decoded.getIssuer())
                .email(decoded.getClaim("email").asString())
                .role(decoded.getClaim("role").asString())
                .build();
        return  new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
