-- Blood Bank & Donor Management Schema

CREATE TABLE blood_banks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    contact_number VARCHAR(20),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blood_inventory (
    id SERIAL PRIMARY KEY,
    blood_bank_id INTEGER REFERENCES blood_banks(id),
    blood_group VARCHAR(5) NOT NULL, -- A+, B-, etc.
    units_available INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    requester_name VARCHAR(255) NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    units_needed INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Fulfilled, Canceled
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
