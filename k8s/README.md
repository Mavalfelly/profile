# Portfolio k3s Deployment

This directory contains the files needed to deploy the portfolio application to a k3s (or any other Kubernetes) cluster.

## Prerequisites

1.  **k3s Cluster**: A running k3s cluster. You can install it on a Linux server with a single command:
    ```bash
    curl -sfL https://get.k3s.io | sh -
    ```
2.  **kubectl**: The Kubernetes command-line tool, configured to communicate with your cluster. When you install k3s, it creates a `k3s.yaml` file at `/etc/rancher/k3s/k3s.yaml`. You can use this file with `kubectl`:
    ```bash
    export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
    kubectl get nodes
    ```
3.  **Docker**: Docker installed on your local machine to build and push the container images.
4.  **Container Registry**: You will need a place to push your container images so that your k3s cluster can pull them. This guide assumes Docker Hub.

## Structure

*   `nginx.conf`: Nginx configuration for the frontend container.
*   `00-namespace.yaml`: Creates a dedicated `portfolio` namespace for the application.
*   `01-pvc.yaml`: Creates a `PersistentVolumeClaim` to provide stable storage for the analytics data.
*   `02-secrets.yaml`: A template for creating the `Secret` that holds your email credentials.
*   `03-backend-deployment.yaml`: Deploys the Node.js backend API server.
*   `04-backend-service.yaml`: Creates a `Service` to expose the backend internally within the cluster.
*   `05-frontend-deployment.yaml`: Deploys the Nginx frontend server.
*   `06-frontend-service.yaml`: Creates a `Service` to expose the frontend internally.
*   `07-ingress.yaml`: Exposes the frontend and the API to the internet via an Ingress controller (Traefik is built-in with k3s).
*   `08-cronjob.yaml`: The `CronJob` that runs the nightly analytics report.

## Deployment Steps

### 1. Build and Push the Docker Images

Before you can deploy to Kubernetes, you need to build the Docker images for the frontend and backend and push them to your container registry.

**Important**: Use your Docker Hub username `mavalfelly25` and your domain `matt-feliciano.com`.

```bash
# Navigate to the root of the project
cd /path/to/your/project

# Build and push the frontend image
docker build -t mavalfelly25/portfolio-frontend:latest .
docker push mavalfelly25/portfolio-frontend:latest

# Build and push the backend image
docker build -t mavalfelly25/portfolio-backend:latest -f server/Dockerfile .
docker push mavalfelly25/portfolio-backend:latest
```

### 2. Update the Kubernetes Manifests

The Docker image references in `k8s/03-backend-deployment.yaml`, `k8s/05-frontend-deployment.yaml`, and `k8s/08-cronjob.yaml` have been updated to use `mavalfelly25`.

You will also need to update `k8s/07-ingress.yaml` with your actual domain name. Replace `matt-feliciano.com` with your domain.

### 3. Create the Secret

First, you need to encode your email username and password in Base64.

```bash
echo -n 'your-email@gmail.com' | base64
echo -n 'your-gmail-app-password' | base64
```

Copy the resulting strings into `k8s/02-secrets.yaml`, replacing the placeholders. Then, apply the secret to your cluster:

```bash
kubectl apply -f k8s/02-secrets.yaml
```

### 4. Apply the Manifests

Apply all the manifest files to your cluster in order.

```bash
kubectl apply -f k8s/
```

### 5. Configure DNS

1.  **Find your k3s Ingress Controller\'s External IP**: You need to determine the external IP address that your k3s Ingress controller is exposed on. The method for this depends on your k3s setup (e.g., if it\'s running on a cloud provider, you might need to check your load balancer\'s IP). For a simple local setup, it might be the IP of your k3s server itself.
2.  **Configure DNS**: In your DNS provider (e.g., Namecheap), you will typically set up a DNS record for your domain `matt-feliciano.com`.
    *   **CNAME Record (Recommended for flexibility)**: Create a CNAME record for `matt-feliciano.com` (or a subdomain like `www.matt-feliciano.com`) and point it to the hostname or IP address provided by your k3s ingress controller. If your ingress controller has an external IP, you might create an A record pointing to that IP. However, if your ingress controller provides a stable hostname, using a CNAME pointing to that hostname is often preferred.
    *   **A Record**: If you have a static IP address for your k3s server or ingress, you can create an A record for `matt-feliciano.com` pointing directly to that IP address.

After you have configured your DNS records, it may take some time for the changes to propagate. You should then be able to access your application at `matt-feliciano.com`.

## Managing the Deployment

*   **Check the status of your pods**: `kubectl get pods -n portfolio`
*   **View logs for a pod**: `kubectl logs -n portfolio <pod-name>`
*   **Delete the deployment**: `kubectl delete -f k8s/`