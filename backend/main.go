// package main

// import (
// 	"fmt"
// 	"log"

// 	"net/http"
// 	"os/exec"

// 	"github.com/rs/cors"
// )

// // func main() {
// //     cmd := exec.Command("npx", "ts-node", "./script/index.ts")
// //     out, err := cmd.Output()

// //     if err != nil {
// //         log.Fatal(err)
// //     }

// //     fmt.Println(string(out))
// // }

// func corsMiddleware(handler http.Handler) http.Handler {
//     return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//         w.Header().Set("Access-Control-Allow-Origin", "*")
//         w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
//         w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

//         // If this is an OPTIONS request (a preflight request), respond with OK.
//         if r.Method == "OPTIONS" {
//             w.WriteHeader(http.StatusOK)
//             return
//         }

//         handler.ServeHTTP(w, r)
//     })
// }

// func main() {
//     mux := http.NewServeMux()

// 	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
//         cmd := exec.Command("npx", "ts-node", "./script/index.ts")
// 		out, err := cmd.Output()

// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		fmt.Fprint(w, string(out))
// 	})
// 	// Create a CORS handler with allowed origins (replace "*" with your allowed origin)
// 	corsHandler := cors.New(cors.Options{
// 		AllowedOrigins:   []string{"*"},     // Set your allowed origins here
// 		AllowedMethods:   []string{"GET"},   // Adjust the allowed HTTP methods
// 		AllowedHeaders:   []string{"*"},     // Set allowed headers
// 		AllowCredentials: true,              // Allow credentials such as cookies
// 	}).Handler(mux)

// 	// Start the server with CORS handling
// 	log.Fatal(http.ListenAndServe(":8080", corsHandler))
// }

package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
    mux := mux.NewRouter()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        cmd := exec.Command("npx", "ts-node", "./script/index.ts")
        out, err := cmd.Output()

        if err != nil {
            log.Fatal(err)
        }

        fmt.Fprint(w, string(out))
    })

    // Wrap the router with the cors middleware
    handler := cors.Default().Handler(mux)

    // Start the server with the cors middleware
    log.Fatal(http.ListenAndServe(":8080", handler))
}