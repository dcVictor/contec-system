import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import db from './database.js';
import dotenv from 'dotenv';

dotenv.config();

// Estratégia Local
passport.use(
    new LocalStrategy(
        {
            usernameField: process.env.PASSPORT_USERNAME_FIELD || "username",
            passwordField: process.env.PASSPORT_PASSWORD_FIELD || "password",
        },
        async (username, password, done) => {
            try {
                // busca o usuário no banco de dados
                const user = await db.oneOrNone(
                    "SELECT nome, senha, cargo FROM usuario WHERE nome = $1;",
                    [username],
                );

    
                // se não encontrou, retorna erro
                if (!user) {
                    return done(null, false, { message: "Usuário incorreto." });
                }

                console.log("Usuário encontrado:", user);

                // verifica se o hash da senha bate com a senha informada
                const passwordMatch = await bcrypt.compare(
                    password,
                    user.senha,
                );

                // se senha está ok, retorna o objeto usuário
                if (passwordMatch) {
                    console.log("Usuário autenticado!");
                    return done(null, user);
                } else {
                    // senão, retorna um erro
                    return done(null, false, { message: "Senha incorreta." });
                }
            } catch (error) {
                return done(error);
            }
        },
    ),
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET, // Use a chave secreta definida no .env
        },
        async (payload, done) => {
            try {
                const user = await db.oneOrNone(
                    "SELECT nome, senha, cargo FROM usuario WHERE nome = $1;",
                    [payload.username],
                );

                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        },
    ),
);

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, {
            user_id: user.user_id,
            username: user.user_id,
        });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// Middleware para bloquear acesso de instaladores a rotas restritas
export function blockInstalador(req, res, next) {
    if (req.user && req.user.cargo === 'instalador') {
        return res.status(403).json({ message: 'Acesso restrito. Instaladores não podem acessar esta rota.' });
    }
    return next();
}

export const requireJWTAuth = passport.authenticate("jwt", { session: false });

export default passport;