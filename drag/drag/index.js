function $ (id) {
    return document.getElementById(id);
}

var subject1 = $("subject1"),
    subject2 = $("subject2"),
    subject3 = $("subject3"),
    subject4 = $("subject4"),
    subject5 = $("subject5"),
    clause1 = $("clause1"),
    clause2 = $("clause2"),
    clause3 = $("clause3"),
    clause4 = $("clause4"),
    clause5 = $("clause5");

var score = $("score");

var moving_subject = null;

var mistake = 0;

var clauses = document.querySelectorAll('.clause');

[].forEach.call(clauses, function(clause) {
    clause.addEventListener('dragstart', function (e) {
        this.classList.add("moving");
        moving_subject = this;
    }, false);

    clause.addEventListener('dragend', function (e) {
        this.classList.remove("moving");
    }, false);
});

var subjects = document.querySelectorAll('.subject');

[].forEach.call(subjects, function(subject) {
    subject.addEventListener('dragover', function (e) {
        e.preventDefault();
        this.classList.add("subject-over");
    }, false);

    subject.addEventListener('dragleave', function (e) {
        this.classList.remove("subject-over");
    });

    subject.addEventListener("drop", function (e) {
        e.preventDefault();
        this.classList.remove("subject-over");

        if (this == subject1 && moving_subject == clause2) {
            subject2.classList.remove('hide');
            clause_next(clause2, clause3);
            subject1.style.background = "#fff";
            tts(moving_subject.innerText);
        } else if (this == subject1 && moving_subject == clause3) {
            subject3.classList.remove('hide');
            clause_next(clause3, clause4);
            subject1.style.background = "#fff";
            tts(moving_subject.innerText);
        } else if (this == subject3 && moving_subject == clause4) {
            subject4.classList.remove('hide');
            clause_next(clause4, clause5);
            subject3.style.background = "#fff";
            tts(moving_subject.innerText);
        } else if ((this == subject3 || this == subject4) && moving_subject == clause5) {
            subject5.classList.remove('hide');
            clause_next(clause5);
            subject3.style.background = "#fff";
            subject4.style.background = "#fff";
            tts(moving_subject.innerText);

            read(subject1);
            read(subject2);
            read(subject3);
            read(subject4);
            read(subject5);

        } else {
            if (mistake == 1) {
                if (moving_subject == clause2) {
                    subject1.style.background = "#8CCBB8";
                } else if (moving_subject == clause3) {
                    subject1.style.background = "#8CCBB8";
                } else if (moving_subject == clause4) {
                    subject3.style.background = "#8CCBB8";
                } else if (moving_subject == clause5) {
                    subject3.style.background = "#8CCBB8";
                    subject4.style.background = "#8CCBB8";
                }
                mistake = 0;
            } else {
                score.innerText = parseInt(score.innerText) - 1;
                mistake += 1;
            }
        }
    });
});

function clause_next (c1, c2) {
    c1.classList.remove('active');
    c1.classList.add('useless');
    c1.setAttribute("draggable", "false");

    if (c2 != null) {
        c2.classList.add('active');
        c2.setAttribute("draggable", "true");
    }

    score.innerText = parseInt(score.innerText) + 1;
}

// Chrome
function tts (str) {
    var u = new SpeechSynthesisUtterance(str);
    speechSynthesis.speak(u);
}

function read (c) {
    //c.style.background = "#EBA63D";
    tts(c.innerHTML);
    //c.style.background = "#fff";
}


