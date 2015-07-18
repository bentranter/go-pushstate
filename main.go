package main

import (
	"html/template"
	"log"
	"net/http"
)

// templates is a variable that holds our cached templates.
// Since you don't want to do I/O every time you need to
// render a template, we read all the templates at startup,
// so we have them in memory
var templates = template.Must(
	template.ParseGlob("tpl/*"),
)

// Page is the contents of an HTML page
type Page struct {
	Title string
}

// homeHandler handles the home page. It also get's called
// twice, because your browser asks for `favicon.ico`.
// This needs a serveMux to handle the browser asking for
// `favicon.ico` with every request.
func homeHandler(w http.ResponseWriter, r *http.Request) {
	err := templates.ExecuteTemplate(w, "home.html", &Page{Title: "Test"})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// testHandler responds with the `test.html` template, to
// be used with testing some front end code.
func testHandler(w http.ResponseWriter, r *http.Request) {
	err := templates.ExecuteTemplate(w, "test.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	log.Println("Started")
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/test/", testHandler)
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js/"))))
	http.ListenAndServe(":3000", nil)
}
