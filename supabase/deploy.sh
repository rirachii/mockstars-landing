#!/bin/bash

# MockStars Resume Parser - Supabase Edge Functions Deployment Script

echo "🚀 Deploying MockStars Resume Parser Edge Functions..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase"
    echo "or"
    echo "brew install supabase/tap/supabase"
    exit 1
fi

# Check if logged in
if ! supabase status &> /dev/null; then
    echo "🔐 Please login to Supabase first:"
    echo "supabase login"
    exit 1
fi

# Set environment variables (you'll need to update these)
echo "🔧 Setting up environment variables..."

# OpenRouter API Key for AI processing
read -p "Enter your OpenRouter API Key: " OPENROUTER_API_KEY
if [ -z "$OPENROUTER_API_KEY" ]; then
    echo "❌ OpenRouter API Key is required"
    exit 1
fi

# Vertex AI Configuration
read -p "Enter your Vertex AI Project ID: " VERTEX_AI_PROJECT_ID
if [ -z "$VERTEX_AI_PROJECT_ID" ]; then
    echo "❌ Vertex AI Project ID is required"
    exit 1
fi

read -p "Enter your Vertex AI Location (default: us-central1): " VERTEX_AI_LOCATION
VERTEX_AI_LOCATION=${VERTEX_AI_LOCATION:-us-central1}

read -p "Enter your Vertex AI API Key: " VERTEX_AI_API_KEY
if [ -z "$VERTEX_AI_API_KEY" ]; then
    echo "❌ Vertex AI API Key is required"
    exit 1
fi

# Set secrets
echo "🔐 Setting secrets..."
supabase secrets set OPENROUTER_API_KEY="$OPENROUTER_API_KEY"
supabase secrets set VERTEX_AI_PROJECT_ID="$VERTEX_AI_PROJECT_ID"
supabase secrets set VERTEX_AI_LOCATION="$VERTEX_AI_LOCATION"
supabase secrets set VERTEX_AI_API_KEY="$VERTEX_AI_API_KEY"

# Deploy the functions
echo "📤 Deploying Edge Functions..."

# Deploy resume-parse-upload function
echo "Deploying resume-parse-upload..."
supabase functions deploy resume-parse-upload

if [ $? -eq 0 ]; then
    echo "✅ resume-parse-upload deployed successfully"
else
    echo "❌ Failed to deploy resume-parse-upload"
    exit 1
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Function URLs:"
echo "resume-parse-upload: https://[your-project-ref].supabase.co/functions/v1/resume-parse-upload"
echo ""
echo "🔧 Next steps:"
echo "1. Update your frontend to use the deployed function URLs"
echo "2. Test the functions with your application"
echo "3. Monitor usage in your Supabase dashboard"
echo ""
echo "📊 Usage monitoring:"
echo "- Check function logs: supabase functions logs resume-parse-upload"
echo "- View metrics in Supabase dashboard"
echo ""
echo "💡 Local development:"
echo "- Start local functions: supabase functions serve"
echo "- Test locally: supabase functions serve resume-parse-upload"
