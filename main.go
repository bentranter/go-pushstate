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
// twice, because your browser asks for `favicon.ico`
func homeHandler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.UserAgent() + "\n\n")
	err := templates.ExecuteTemplate(w, "home.html", &Page{Title: "Test"})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	log.Println("Started")
	http.HandleFunc("/", homeHandler)
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./js/"))))
	http.ListenAndServe(":3000", nil)
}
