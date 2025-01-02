#!/bin/bash

# Configuration files
readonly ENV_FILE=".env.development"
readonly UI_ENV_FILE="frontend/.env.local"
readonly REALM_FILE=".docker/keycloak/momoino-realm.json"

# Generates a secure random key in base64 format
# Returns: Base64 encoded random key or error code 1
function generate_secure_key() {
    if ! dd if=/dev/urandom bs=32 count=1 2>/dev/null | base64 | tr '+/' '-_' | tr -d '\n'; then
        echo "Error: Failed to generate secure key" >&2
        return 1
    fi
}

# Updates environment variables in a file
# Args:
#   $1 - Target file path
#   $2 - Variables to substitute (comma-separated)
# Returns: 0 on success, 1 on failure
function update_environment_file() {
    local file="$1"
    local variables="$2"
    local temp_file="${file}.tmp"
    local backup_file="${file}.bak"

    echo "Updating environment variables in: $file"

    # Create backup
    if ! cp "$file" "$backup_file"; then
        echo "Error: Failed to create backup of $file" >&2
        return 1
    fi

    # Substitute variables
    if ! envsubst "$variables" < "$file" > "$temp_file"; then
        echo "Error: Failed to update variables in $file" >&2
        mv "$backup_file" "$file"
        return 1
    fi

    # Validate output
    if [ ! -s "$temp_file" ]; then
        echo "Error: Generated file is empty" >&2
        mv "$backup_file" "$file"
        rm -f "$temp_file"
        return 1
    fi

    # Apply changes
    if ! mv "$temp_file" "$file"; then
        echo "Error: Failed to save changes to $file" >&2
        mv "$backup_file" "$file"
        return 1
    fi

    echo "Successfully updated $file"
    return 0
}

# Generates all required security keys
# Args:
#   $1 - Variable to store client secret
#   $2 - Variable to store default password
#   $3 - Variable to store cookie secret
# Returns: 0 on success, 1 on failure
function generate_security_keys() {
    local -n client_secret=$1
    local -n default_password=$2
    local -n cookie_secret=$3

    echo "Generating security keys..."

    client_secret=$(generate_secure_key) || return 1
    default_password=$(generate_secure_key) || return 1
    cookie_secret=$(generate_secure_key) || return 1

    export client_secret default_password cookie_secret
    echo "Security keys generated successfully"
    return 0
}

# Main execution flow
function main() {
    declare -x CLIENT_SECRET DEFAULT_PASSWORD COOKIE_SECRET

    echo "=== Starting Environment Setup ==="

    # Generate security keys
    if ! generate_security_keys CLIENT_SECRET DEFAULT_PASSWORD COOKIE_SECRET; then
        echo "Error: Failed to generate security keys" >&2
        exit 1
    fi

    # Update environment configuration
    if ! update_environment_file "$ENV_FILE" "\$CLIENT_SECRET,\$DEFAULT_PASSWORD,\$COOKIE_SECRET"; then
        exit 1
    fi

    # Set restrictive file permissions
    if ! chmod 600 "$ENV_FILE"; then
        echo "Error: Failed to set secure file permissions" >&2
        exit 1
    fi

    # Update Keycloak realm configuration
    if ! update_environment_file "$REALM_FILE" "\$CLIENT_SECRET"; then
        exit 1
    fi

    # Update environment configuration
    if ! update_environment_file "$UI_ENV_FILE" "\$CLIENT_SECRET"; then
        exit 1
    fi

    # Set restrictive file permissions
    if ! chmod 600 "$UI_ENV_FILE"; then
        echo "Error: Failed to set secure file permissions" >&2
        exit 1
    fi

    # Clean up backup files
    rm -f "$ENV_FILE.bak" "$REALM_FILE.bak" "$UI_ENV_FILE.bak"

    echo "=== Environment Setup Complete ==="
}

main
