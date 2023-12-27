package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		cmd := exec.Command("node", "./script/index.ts")
		out, err := cmd.Output()

		if err != nil {
			log.Fatal(err)
		}

		fmt.Fprint(w, string(out))
    })
	handler := cors.Default().Handler(mux)

    http.ListenAndServe(":8080", handler)
}