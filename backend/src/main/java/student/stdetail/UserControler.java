package student.stdetail;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserControler {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<User> GetUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public User GetUsers(@PathVariable String id) {
        return userRepository.findById(id).orElse(null);
    }
    
    @PostMapping("/")
    public User postMethodName(@RequestBody User user){
        return userRepository.save(user);
    }

    @PutMapping("/")
    public User PutMapping(@RequestBody User newUser){
        User oldUser = userRepository.findById(newUser.getId()).orElse(null);
        oldUser.setName(newUser.getName());
        oldUser.setDob(newUser.getDob());
        oldUser.setClassn(newUser.getClassn());
        oldUser.setSection(newUser.getSection());
        oldUser.setGender(newUser.getGender());
        userRepository.save(oldUser);
        return oldUser;
    }

    @DeleteMapping("/{id}")
    public String DeleteUser(@PathVariable String id){
        userRepository.deleteById(id);
        return id;
    }

}
