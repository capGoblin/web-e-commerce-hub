package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"

	// "github.com/gofiber/fiber/v2"
	// "github.com/gofiber/cors/v2"
	"github.com/gorilla/mux"
	// "github.com/gofiber/fiber/v2"
	// "github.com/gofiber/fiber/v2/middleware/cors"
)

type Product struct {
    Title   string `json:"title"`
    ImgSrc  string `json:"imgSrc"`
    Price   string `json:"price"`
}

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
		var stdout, stderr bytes.Buffer
		cmd.Stdout = &stdout
		cmd.Stderr = &stderr

		err := cmd.Run()
		if err != nil {
			log.Printf("Error executing script: %v\n", err)
			return
		}

		// Parse the output of the script
		var products []Product
		if err := json.Unmarshal(stdout.Bytes(), &products); err != nil {
			log.Printf("Error parsing JSON: %v\n", err)
			return
		}

		// Store the products in Supabase database
		if err := storeProductsInSupabase(products); err != nil {
			log.Printf("Error storing products in Supabase: %v\n", err)
			return
		}

		// Respond with the output of the script
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(stdout.Bytes())
	}()
    // go func() {
    //     cmd := exec.Command("npx", "ts-node", "./script/index.ts")
    //     out, err := cmd.Output()
    //     if err != nil {
    //         errChan <- err
    //         return
    //     }
    //     outChan <- out
    // }()

    // Wait for the command output or error using a select statement
    w.WriteHeader(http.StatusAccepted)
    // select {
    // case out := <-outChan:
    //     w.Write(out)
    // case err := <-errChan:
    //     http.Error(w, "Failed to execute script", http.StatusInternalServerError)
    //     log.Println("Error executing script:", err)
    // }
}

func storeProductsInSupabase(products []Product) error {
	// Marshal products data into JSON
	payload, err := json.Marshal(products)
	if err != nil {
		return err
	}

	// Make HTTP request to Supabase API to insert data into the database
	resp, err := http.Post("https://your-supabase-url.com/table-name", "application/json", bytes.NewBuffer(payload))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("Supabase API request failed with status code %d", resp.StatusCode)
	}

	return nil
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