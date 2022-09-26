package com.pfirewire.characterbuilder.controllers;

import com.pfirewire.characterbuilder.models.User;
import com.pfirewire.characterbuilder.repositories.PlayerCharacterRepository;
import com.pfirewire.characterbuilder.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    // Repositories and Services
    private UserRepository userDao;
    private PlayerCharacterRepository playerCharacterDao;
    private PasswordEncoder passwordEncoder;

    // Constructor
    public UserController(
            UserRepository userDao,
            PlayerCharacterRepository playerCharacterDao,
            PasswordEncoder passwordEncoder)
    {
        this.userDao = userDao;
        this.playerCharacterDao = playerCharacterDao;
        this.passwordEncoder = passwordEncoder;
    }

//    // Shows form to sign up as a user
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        // Sending empty user to template
        model.addAttribute("user", new User());
        return "users/signup";
    }

    @PostMapping("/signup")
    public String saveUser(@ModelAttribute User user) {
        String hash = passwordEncoder.encode(user.getPassword());
        user.setPassword(hash);
        userDao.save(user);
        return "/index";
    }




    // Code taken from Spring Boot Exercises


//
//    // Shows user profile
//    // At the moment this just shows the list of all posts user has created
//    @GetMapping("/profile")
//    public String showUserPosts(Model model) {
//        // Creating a list of all posts and empty post to populate
//        List<Post> allPosts = postDao.findAll();
//        List<Post> userPosts = new ArrayList<>();
//
//        // Setting user to currently logged in user
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//        // Iterates through all posts and adds to new list if created by logged in user
//        for(Post post : allPosts) {
//            if(Objects.equals(post.getUserId(), user.getId())) {
//                userPosts.add(post);
//            }
//        }
//
//        // Sending user created post list to template
//        model.addAttribute("posts", userPosts);
//        return "/users/profile";
//    }
}