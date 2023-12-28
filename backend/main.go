// package main

// import (
// 	"fmt"

// 	"net/http"
// 	"os/exec"
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

// 		fmt.Println(string(out))
// 	// })
// 	// Create a CORS handler with allowed origins (replace "*" with your allowed origin)
// 	// corsHandler := cors.New(cors.Options{
// 	// 	AllowedOrigins:   []string{"*"},     // Set your allowed origins here
// 	// 	AllowedMethods:   []string{"GET"},   // Adjust the allowed HTTP methods
// 	// 	AllowedHeaders:   []string{"*"},     // Set allowed headers
// 	// 	AllowCredentials: true,              // Allow credentials such as cookies
// 	// }).Handler(mux)

// 	// Start the server with CORS handling
// 	log.Fatal(http.ListenAndServe(":8080", corsHandler))
// }

package main

import (
	"log"
	"net/http"
	"os/exec"

	// "github.com/gofiber/fiber/v2"
	// "github.com/gofiber/cors/v2"
	"github.com/gorilla/mux"
	// "github.com/gofiber/fiber/v2"
	// "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/", handleRoot).Methods("GET", "OPTIONS")

    log.Fatal(http.ListenAndServe(":8080", router))
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
    // Set CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

    // Check if the request is for CORS preflight
    if r.Method == "OPTIONS" {
        w.Header().Set("Connection", "keep-alive")
        w.WriteHeader(http.StatusNoContent)
        return
    }

    // Create a channel to receive the command output
    outChan := make(chan []byte)
    errChan := make(chan error)

    // Execute the command asynchronously in a goroutine
    go func() {
        cmd := exec.Command("npx", "ts-node", "./script/index.ts")
        out, err := cmd.Output()
        if err != nil {
            errChan <- err
            return
        }
        outChan <- out
    }()

    // Wait for the command output or error using a select statement
    select {
    case out := <-outChan:
        w.Write(out)
    case err := <-errChan:
        http.Error(w, "Failed to execute script", http.StatusInternalServerError)
        log.Println("Error executing script:", err)
    }
}



// func main() {
//     // create router
//     router := mux.NewRouter()

//     // create subrouter
//     subRouter := router.PathPrefix("/").Subrouter()
//     subRouter.HandleFunc("/", handleRoot).Methods("GET")

//     // wrap the subrouter with CORS and JSON content type middlewares
//     enhancedSubRouter := enableCORS(jsonContentTypeMiddleware(subRouter))

//     // replace the subrouter with the enhanced subrouter
//     router.PathPrefix("/").Handler(enhancedSubRouter)

//     // start server
//     log.Fatal(http.ListenAndServe(":8080", router))
// }

// func handleRoot(w http.ResponseWriter, r *http.Request) {
//     cmd := exec.Command("npx", "ts-node", "./script/index.ts")
//     out, err := cmd.Output()

//     if err != nil {
//         log.Fatal(err)
//     }

//     w.Write(out)
// }

// func enableCORS(next http.Handler) http.Handler {
//     return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//         // Set CORS headers
//         w.Header().Set("Access-Control-Allow-Origin", "*") // Allow any origin
//         w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//         w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

//         // Check if the request is for CORS preflight
//         if r.Method == "OPTIONS" {
//             w.WriteHeader(http.StatusOK)
//             return
//         }

//         // Pass down the request to the next middleware (or final handler)
//         next.ServeHTTP(w, r)
//     })
// }

// func jsonContentTypeMiddleware(next http.Handler) http.Handler {
//     return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//         // Set JSON Content-Type
//         w.Header().Set("Content-Type", "application/json")
//         next.ServeHTTP(w, r)
//     })
// }


// func main() {
//     mux := mux.NewRouter()
//     mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
//         cmd := exec.Command("npx", "ts-node", "./script/index.ts")
//         out, err := cmd.Output()

//         if err != nil {
//             log.Fatal(err)
//         }

//         fmt.Fprint(w, string(out))
//     })

//     // Wrap the router with the cors middleware
//     handler := cors.Default().Handler(mux)

//     // Start the server with the cors middleware
//     log.Fatal(http.ListenAndServe(":8080", handler))
// }