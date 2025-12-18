export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      account_data_requests: {
        Row: {
          created_at: string | null
          email_sent_at: string | null
          file_url: string | null
          id: string
          last_error: string | null
          payload: Json | null
          processed_at: string | null
          request_type: string
          result_payload: Json | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_sent_at?: string | null
          file_url?: string | null
          id?: string
          last_error?: string | null
          payload?: Json | null
          processed_at?: string | null
          request_type: string
          result_payload?: Json | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_sent_at?: string | null
          file_url?: string | null
          id?: string
          last_error?: string | null
          payload?: Json | null
          processed_at?: string | null
          request_type?: string
          result_payload?: Json | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      account_privacy_audit: {
        Row: {
          action: string
          created_at: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      achievement_definitions: {
        Row: {
          category: string
          code: string
          created_at: string | null
          description: string
          icon: string
          is_active: boolean | null
          name: string
          requirement_type: string
          requirement_value: number | null
          tier: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          description: string
          icon: string
          is_active?: boolean | null
          name: string
          requirement_type: string
          requirement_value?: number | null
          tier: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          description?: string
          icon?: string
          is_active?: boolean | null
          name?: string
          requirement_type?: string
          requirement_value?: number | null
          tier?: string
        }
        Relationships: []
      }
      activities: {
        Row: {
          content: string | null
          created_at: string | null
          destination_slug: string | null
          id: string
          list_id: string | null
          review_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          destination_slug?: string | null
          id?: string
          list_id?: string | null
          review_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          destination_slug?: string | null
          id?: string
          list_id?: string | null
          review_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_feed: {
        Row: {
          achievement_code: string | null
          activity_type: string
          collection_id: string | null
          created_at: string | null
          destination_slug: string | null
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          achievement_code?: string | null
          activity_type: string
          collection_id?: string | null
          created_at?: string | null
          destination_slug?: string | null
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          achievement_code?: string | null
          activity_type?: string
          collection_id?: string | null
          created_at?: string | null
          destination_slug?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_feed_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      architects: {
        Row: {
          bio: string | null
          birth_year: number | null
          created_at: string | null
          death_year: number | null
          design_philosophy: string | null
          id: string
          image_url: string | null
          influenced_by: string[] | null
          influences: string[] | null
          movements: string[] | null
          name: string
          nationality: string | null
          notable_works: string[] | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          birth_year?: number | null
          created_at?: string | null
          death_year?: number | null
          design_philosophy?: string | null
          id?: string
          image_url?: string | null
          influenced_by?: string[] | null
          influences?: string[] | null
          movements?: string[] | null
          name: string
          nationality?: string | null
          notable_works?: string[] | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          birth_year?: number | null
          created_at?: string | null
          death_year?: number | null
          design_philosophy?: string | null
          id?: string
          image_url?: string | null
          influenced_by?: string[] | null
          influences?: string[] | null
          movements?: string[] | null
          name?: string
          nationality?: string | null
          notable_works?: string[] | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      architectural_photos: {
        Row: {
          caption: string | null
          created_at: string | null
          destination_id: number
          id: string
          is_primary: boolean | null
          order_index: number | null
          photographer: string | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          destination_id: number
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          photographer?: string | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          destination_id?: number
          id?: string
          is_primary?: boolean | null
          order_index?: number | null
          photographer?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "architectural_photos_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      assistant_message_history: {
        Row: {
          created_at: string | null
          id: string
          message_length: number | null
          message_preview: string | null
          role: string
          thread_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_length?: number | null
          message_preview?: string | null
          role: string
          thread_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_length?: number | null
          message_preview?: string | null
          role?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: []
      }
      assistant_preferences: {
        Row: {
          assistant_name: string | null
          assistant_personality: string | null
          conversation_memory_days: number | null
          created_at: string | null
          custom_instructions: string | null
          enable_function_calling: boolean | null
          enable_tts: boolean | null
          enable_vision: boolean | null
          include_travel_history: boolean | null
          include_user_profile: boolean | null
          preferred_model: string | null
          response_style: string | null
          updated_at: string | null
          use_complex_model_threshold: number | null
          use_emoji: boolean | null
          user_id: string
        }
        Insert: {
          assistant_name?: string | null
          assistant_personality?: string | null
          conversation_memory_days?: number | null
          created_at?: string | null
          custom_instructions?: string | null
          enable_function_calling?: boolean | null
          enable_tts?: boolean | null
          enable_vision?: boolean | null
          include_travel_history?: boolean | null
          include_user_profile?: boolean | null
          preferred_model?: string | null
          response_style?: string | null
          updated_at?: string | null
          use_complex_model_threshold?: number | null
          use_emoji?: boolean | null
          user_id: string
        }
        Update: {
          assistant_name?: string | null
          assistant_personality?: string | null
          conversation_memory_days?: number | null
          created_at?: string | null
          custom_instructions?: string | null
          enable_function_calling?: boolean | null
          enable_tts?: boolean | null
          enable_vision?: boolean | null
          include_travel_history?: boolean | null
          include_user_profile?: boolean | null
          preferred_model?: string | null
          response_style?: string | null
          updated_at?: string | null
          use_complex_model_threshold?: number | null
          use_emoji?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      assistant_threads: {
        Row: {
          assistant_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_archived: boolean | null
          last_message_at: string | null
          message_count: number | null
          thread_id: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assistant_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          thread_id: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assistant_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          last_message_at?: string | null
          message_count?: number | null
          thread_id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          country: string
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          country: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          country?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      co_visit_signals: {
        Row: {
          co_visit_score: number | null
          destination_a: number
          destination_b: number
          last_updated: string | null
        }
        Insert: {
          co_visit_score?: number | null
          destination_a: number
          destination_b: number
          last_updated?: string | null
        }
        Update: {
          co_visit_score?: number | null
          destination_a?: number
          destination_b?: number
          last_updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "co_visit_signals_destination_a_fkey"
            columns: ["destination_a"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "co_visit_signals_destination_b_fkey"
            columns: ["destination_b"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_comments: {
        Row: {
          collection_id: string
          comment_text: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          collection_id: string
          comment_text: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          collection_id?: string
          comment_text?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_comments_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_items: {
        Row: {
          added_at: string | null
          collection_id: string
          destination_slug: string
          id: string
          notes: string | null
          position: number | null
        }
        Insert: {
          added_at?: string | null
          collection_id: string
          destination_slug: string
          id?: string
          notes?: string | null
          position?: number | null
        }
        Update: {
          added_at?: string | null
          collection_id?: string
          destination_slug?: string
          id?: string
          notes?: string | null
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "collection_items_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collection_likes: {
        Row: {
          collection_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collection_likes_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
        ]
      }
      collections: {
        Row: {
          comment_count: number | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          slug: string | null
          updated_at: string | null
          user_id: string
          view_count: number | null
        }
        Insert: {
          comment_count?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          slug?: string | null
          updated_at?: string | null
          user_id: string
          view_count?: number | null
        }
        Update: {
          comment_count?: number | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          slug?: string | null
          updated_at?: string | null
          user_id?: string
          view_count?: number | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          review_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          review_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          review_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      content_audit_log: {
        Row: {
          action: string
          changes: Json | null
          conflicts: Json | null
          created_at: string
          document_id: string
          id: string
          metadata: Json | null
          slug: string
          source: string
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          conflicts?: Json | null
          created_at?: string
          document_id: string
          id?: string
          metadata?: Json | null
          slug: string
          source?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          conflicts?: Json | null
          created_at?: string
          document_id?: string
          id?: string
          metadata?: Json | null
          slug?: string
          source?: string
          user_id?: string | null
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          content: string
          created_at: string | null
          destinations: Json | null
          embedding: string | null
          id: string
          intent_data: Json | null
          metadata: Json | null
          role: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          destinations?: Json | null
          embedding?: string | null
          id?: string
          intent_data?: Json | null
          metadata?: Json | null
          role?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          destinations?: Json | null
          embedding?: string | null
          id?: string
          intent_data?: Json | null
          metadata?: Json | null
          role?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "conversation_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_sessions: {
        Row: {
          context: Json | null
          context_summary: string | null
          created_at: string | null
          id: string
          last_activity: string | null
          last_updated: string | null
          metadata: Json | null
          session_token: string | null
          started_at: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          context_summary?: string | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          last_updated?: string | null
          metadata?: Json | null
          session_token?: string | null
          started_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          context_summary?: string | null
          created_at?: string | null
          id?: string
          last_activity?: string | null
          last_updated?: string | null
          metadata?: Json | null
          session_token?: string | null
          started_at?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crowding_data: {
        Row: {
          crowding_level: string | null
          crowding_score: number | null
          day_of_week: number | null
          destination_id: number | null
          hour_of_day: number | null
          id: string
          last_updated: string | null
          sample_size: number | null
        }
        Insert: {
          crowding_level?: string | null
          crowding_score?: number | null
          day_of_week?: number | null
          destination_id?: number | null
          hour_of_day?: number | null
          id?: string
          last_updated?: string | null
          sample_size?: number | null
        }
        Update: {
          crowding_level?: string | null
          crowding_score?: number | null
          day_of_week?: number | null
          destination_id?: number | null
          hour_of_day?: number | null
          id?: string
          last_updated?: string | null
          sample_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "crowding_data_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      design_firms: {
        Row: {
          created_at: string | null
          description: string | null
          founded_year: number | null
          founders: string[] | null
          id: string
          image_url: string | null
          name: string
          notable_works: string[] | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          founders?: string[] | null
          id?: string
          image_url?: string | null
          name: string
          notable_works?: string[] | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          founded_year?: number | null
          founders?: string[] | null
          id?: string
          image_url?: string | null
          name?: string
          notable_works?: string[] | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      design_movements: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          key_characteristics: string[] | null
          name: string
          notable_architects: string[] | null
          period_end: number | null
          period_start: number | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          key_characteristics?: string[] | null
          name: string
          notable_architects?: string[] | null
          period_end?: number | null
          period_start?: number | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          key_characteristics?: string[] | null
          name?: string
          notable_architects?: string[] | null
          period_end?: number | null
          period_start?: number | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      destination_materials: {
        Row: {
          destination_id: number
          material_id: string
        }
        Insert: {
          destination_id: number
          material_id: string
        }
        Update: {
          destination_id?: number
          material_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "destination_materials_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destination_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_relationships: {
        Row: {
          created_at: string | null
          destination_a: number | null
          destination_b: number | null
          id: string
          relation_type: string | null
          similarity_score: number | null
        }
        Insert: {
          created_at?: string | null
          destination_a?: number | null
          destination_b?: number | null
          id?: string
          relation_type?: string | null
          similarity_score?: number | null
        }
        Update: {
          created_at?: string | null
          destination_a?: number | null
          destination_b?: number | null
          id?: string
          relation_type?: string | null
          similarity_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "destination_relationships_destination_a_fkey"
            columns: ["destination_a"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destination_relationships_destination_b_fkey"
            columns: ["destination_b"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_status: {
        Row: {
          confidence_score: number | null
          data_source: string | null
          destination_id: number | null
          expires_at: string | null
          id: string
          metadata: Json | null
          recorded_at: string | null
          status_type: string
          status_value: Json
        }
        Insert: {
          confidence_score?: number | null
          data_source?: string | null
          destination_id?: number | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          recorded_at?: string | null
          status_type: string
          status_value: Json
        }
        Update: {
          confidence_score?: number | null
          data_source?: string | null
          destination_id?: number | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          recorded_at?: string | null
          status_type?: string
          status_value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "destination_status_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          accepts_reservations: boolean | null
          additional_images: string[] | null
          address: string | null
          address_components_json: Json | null
          adr_address: string | null
          advanced_enrichment_at: string | null
          ai_fields_generated_at: string | null
          ai_generated_at: string | null
          ai_keywords: string[] | null
          ai_search_keywords: string[] | null
          ai_short_summary: string | null
          ai_summary: string | null
          ai_vibe_tags: string[] | null
          ambience_tags: string[] | null
          amenities: string[] | null
          architect: string | null
          architect_id: string | null
          architect_info_json: Json | null
          architect_info_updated_at: string | null
          architectural_significance: string | null
          architectural_style: string | null
          atmosphere: string | null
          avg_wait_time_minutes: number | null
          best_months: string[] | null
          best_visit_months: number[] | null
          booking_url: string | null
          brand: string | null
          business_status: string | null
          category: string
          cf_factors: string | null
          chef_name: string | null
          city: string
          color_palette: Json | null
          construction_year: number | null
          content: string | null
          country: string | null
          created_at: string | null
          crown: boolean | null
          cuisine_type: string[] | null
          currency_code: string | null
          currency_updated_at: string | null
          current_opening_hours_json: Json | null
          current_weather_json: Json | null
          data_quality_score: number | null
          description: string | null
          design_awards: Json | null
          design_firm: string | null
          design_firm_id: string | null
          design_period: string | null
          design_story: string | null
          designer_name: string | null
          dietary_options: string[] | null
          distance_from_center_meters: number | null
          dominant_colors: string[] | null
          driving_time_from_center_minutes: number | null
          editorial_summary: string | null
          email: string | null
          embedding: string | null
          embedding_generated_at: string | null
          embedding_model: string | null
          embedding_needs_update: boolean
          embedding_updated_at: string | null
          embedding_version: string | null
          enrichment_version: number | null
          eventbrite_event_categories: string[] | null
          eventbrite_event_count: number | null
          eventbrite_total_attendance: number | null
          eventbrite_updated_at: string | null
          events_updated_at: string | null
          exchange_rate_to_usd: number | null
          experience_tags: string[] | null
          formatted_address: string | null
          gallery: string[] | null
          google_maps_url: string | null
          google_name: string | null
          google_place_id: string | null
          icon_background_color: string | null
          icon_mask_base_uri: string | null
          icon_url: string | null
          id: number
          image: string | null
          image_captions: Json | null
          image_original: string | null
          image_thumbnail: string | null
          instagram: string | null
          instagram_engagement_score: number | null
          instagram_handle: string | null
          instagram_hashtag_count: number | null
          instagram_post_count: number | null
          instagram_total_comments: number | null
          instagram_total_likes: number | null
          instagram_trending_hashtags: string[] | null
          instagram_updated_at: string | null
          instagram_url: string | null
          intelligence_score: number | null
          interior_designer_id: string | null
          interior_style: string | null
          international_phone_number: string | null
          is_open_now: boolean | null
          keywords: string[] | null
          last_enriched: string | null
          last_enriched_at: string | null
          last_indexed_at: string | null
          lat: number | null
          latitude: number | null
          long: number | null
          longitude: number | null
          main_image: string | null
          materials: string[] | null
          michelin_keys: number | null
          michelin_stars: number | null
          micro_description: string | null
          movement_id: string | null
          name: string
          nearby_destinations_json: Json | null
          nearby_events_json: Json | null
          nearby_updated_at: string | null
          neighborhood: string | null
          news_article_count: number | null
          news_sentiment_score: number | null
          news_top_sources: string[] | null
          news_updated_at: string | null
          opening_hours: Json | null
          opening_hours_json: Json | null
          opentable_url: string | null
          parent_destination_id: number | null
          parking_available: boolean | null
          peak_season: string | null
          phone_number: string | null
          photo_analysis_json: Json | null
          photo_count: number | null
          photos_json: Json | null
          place_id: string | null
          place_types_json: Json | null
          plus_code: string | null
          popularity_score: number | null
          price_level: number | null
          price_range: string | null
          price_range_local: string | null
          primary_photo_url: string | null
          rank_score: number | null
          rating: number | null
          reddit_mention_count: number | null
          reddit_trending_subreddits: string[] | null
          reddit_updated_at: string | null
          reddit_upvote_score: number | null
          related_destinations: string[] | null
          renovation_history: Json | null
          reservation_phone: string | null
          resy_url: string | null
          reviews_count: number | null
          reviews_json: Json | null
          route_from_city_center_json: Json | null
          save_count: number | null
          saves_count: number | null
          search_keywords: string[] | null
          search_text: string | null
          secondary_opening_hours_json: Json | null
          short_summary: string | null
          slug: string
          static_map_generated_at: string | null
          static_map_url: string | null
          style_tags: string[] | null
          subline: string | null
          tags: string[] | null
          tiktok_engagement_score: number | null
          tiktok_hashtag_count: number | null
          tiktok_total_likes: number | null
          tiktok_total_shares: number | null
          tiktok_total_views: number | null
          tiktok_trending_hashtags: string[] | null
          tiktok_trending_score: number | null
          tiktok_updated_at: string | null
          tiktok_video_count: number | null
          timezone_id: string | null
          transit_time_from_center_minutes: number | null
          trending_score: number | null
          upcoming_event_count: number | null
          user_ratings_total: number | null
          utc_offset: number | null
          vector_embedding: string | null
          vibe_tags: string[] | null
          vicinity: string | null
          views_count: number | null
          visits_count: number | null
          walking_time_from_center_minutes: number | null
          weather_forecast_json: Json | null
          weather_updated_at: string | null
          web_content_json: Json | null
          web_content_updated_at: string | null
          website: string | null
          wheelchair_accessible: boolean | null
          year_established: number | null
          year_opened: number | null
        }
        Insert: {
          accepts_reservations?: boolean | null
          additional_images?: string[] | null
          address?: string | null
          address_components_json?: Json | null
          adr_address?: string | null
          advanced_enrichment_at?: string | null
          ai_fields_generated_at?: string | null
          ai_generated_at?: string | null
          ai_keywords?: string[] | null
          ai_search_keywords?: string[] | null
          ai_short_summary?: string | null
          ai_summary?: string | null
          ai_vibe_tags?: string[] | null
          ambience_tags?: string[] | null
          amenities?: string[] | null
          architect?: string | null
          architect_id?: string | null
          architect_info_json?: Json | null
          architect_info_updated_at?: string | null
          architectural_significance?: string | null
          architectural_style?: string | null
          atmosphere?: string | null
          avg_wait_time_minutes?: number | null
          best_months?: string[] | null
          best_visit_months?: number[] | null
          booking_url?: string | null
          brand?: string | null
          business_status?: string | null
          category: string
          cf_factors?: string | null
          chef_name?: string | null
          city: string
          color_palette?: Json | null
          construction_year?: number | null
          content?: string | null
          country?: string | null
          created_at?: string | null
          crown?: boolean | null
          cuisine_type?: string[] | null
          currency_code?: string | null
          currency_updated_at?: string | null
          current_opening_hours_json?: Json | null
          current_weather_json?: Json | null
          data_quality_score?: number | null
          description?: string | null
          design_awards?: Json | null
          design_firm?: string | null
          design_firm_id?: string | null
          design_period?: string | null
          design_story?: string | null
          designer_name?: string | null
          dietary_options?: string[] | null
          distance_from_center_meters?: number | null
          dominant_colors?: string[] | null
          driving_time_from_center_minutes?: number | null
          editorial_summary?: string | null
          email?: string | null
          embedding?: string | null
          embedding_generated_at?: string | null
          embedding_model?: string | null
          embedding_needs_update?: boolean
          embedding_updated_at?: string | null
          embedding_version?: string | null
          enrichment_version?: number | null
          eventbrite_event_categories?: string[] | null
          eventbrite_event_count?: number | null
          eventbrite_total_attendance?: number | null
          eventbrite_updated_at?: string | null
          events_updated_at?: string | null
          exchange_rate_to_usd?: number | null
          experience_tags?: string[] | null
          formatted_address?: string | null
          gallery?: string[] | null
          google_maps_url?: string | null
          google_name?: string | null
          google_place_id?: string | null
          icon_background_color?: string | null
          icon_mask_base_uri?: string | null
          icon_url?: string | null
          id?: number
          image?: string | null
          image_captions?: Json | null
          image_original?: string | null
          image_thumbnail?: string | null
          instagram?: string | null
          instagram_engagement_score?: number | null
          instagram_handle?: string | null
          instagram_hashtag_count?: number | null
          instagram_post_count?: number | null
          instagram_total_comments?: number | null
          instagram_total_likes?: number | null
          instagram_trending_hashtags?: string[] | null
          instagram_updated_at?: string | null
          instagram_url?: string | null
          intelligence_score?: number | null
          interior_designer_id?: string | null
          interior_style?: string | null
          international_phone_number?: string | null
          is_open_now?: boolean | null
          keywords?: string[] | null
          last_enriched?: string | null
          last_enriched_at?: string | null
          last_indexed_at?: string | null
          lat?: number | null
          latitude?: number | null
          long?: number | null
          longitude?: number | null
          main_image?: string | null
          materials?: string[] | null
          michelin_keys?: number | null
          michelin_stars?: number | null
          micro_description?: string | null
          movement_id?: string | null
          name: string
          nearby_destinations_json?: Json | null
          nearby_events_json?: Json | null
          nearby_updated_at?: string | null
          neighborhood?: string | null
          news_article_count?: number | null
          news_sentiment_score?: number | null
          news_top_sources?: string[] | null
          news_updated_at?: string | null
          opening_hours?: Json | null
          opening_hours_json?: Json | null
          opentable_url?: string | null
          parent_destination_id?: number | null
          parking_available?: boolean | null
          peak_season?: string | null
          phone_number?: string | null
          photo_analysis_json?: Json | null
          photo_count?: number | null
          photos_json?: Json | null
          place_id?: string | null
          place_types_json?: Json | null
          plus_code?: string | null
          popularity_score?: number | null
          price_level?: number | null
          price_range?: string | null
          price_range_local?: string | null
          primary_photo_url?: string | null
          rank_score?: number | null
          rating?: number | null
          reddit_mention_count?: number | null
          reddit_trending_subreddits?: string[] | null
          reddit_updated_at?: string | null
          reddit_upvote_score?: number | null
          related_destinations?: string[] | null
          renovation_history?: Json | null
          reservation_phone?: string | null
          resy_url?: string | null
          reviews_count?: number | null
          reviews_json?: Json | null
          route_from_city_center_json?: Json | null
          save_count?: number | null
          saves_count?: number | null
          search_keywords?: string[] | null
          search_text?: string | null
          secondary_opening_hours_json?: Json | null
          short_summary?: string | null
          slug: string
          static_map_generated_at?: string | null
          static_map_url?: string | null
          style_tags?: string[] | null
          subline?: string | null
          tags?: string[] | null
          tiktok_engagement_score?: number | null
          tiktok_hashtag_count?: number | null
          tiktok_total_likes?: number | null
          tiktok_total_shares?: number | null
          tiktok_total_views?: number | null
          tiktok_trending_hashtags?: string[] | null
          tiktok_trending_score?: number | null
          tiktok_updated_at?: string | null
          tiktok_video_count?: number | null
          timezone_id?: string | null
          transit_time_from_center_minutes?: number | null
          trending_score?: number | null
          upcoming_event_count?: number | null
          user_ratings_total?: number | null
          utc_offset?: number | null
          vector_embedding?: string | null
          vibe_tags?: string[] | null
          vicinity?: string | null
          views_count?: number | null
          visits_count?: number | null
          walking_time_from_center_minutes?: number | null
          weather_forecast_json?: Json | null
          weather_updated_at?: string | null
          web_content_json?: Json | null
          web_content_updated_at?: string | null
          website?: string | null
          wheelchair_accessible?: boolean | null
          year_established?: number | null
          year_opened?: number | null
        }
        Update: {
          accepts_reservations?: boolean | null
          additional_images?: string[] | null
          address?: string | null
          address_components_json?: Json | null
          adr_address?: string | null
          advanced_enrichment_at?: string | null
          ai_fields_generated_at?: string | null
          ai_generated_at?: string | null
          ai_keywords?: string[] | null
          ai_search_keywords?: string[] | null
          ai_short_summary?: string | null
          ai_summary?: string | null
          ai_vibe_tags?: string[] | null
          ambience_tags?: string[] | null
          amenities?: string[] | null
          architect?: string | null
          architect_id?: string | null
          architect_info_json?: Json | null
          architect_info_updated_at?: string | null
          architectural_significance?: string | null
          architectural_style?: string | null
          atmosphere?: string | null
          avg_wait_time_minutes?: number | null
          best_months?: string[] | null
          best_visit_months?: number[] | null
          booking_url?: string | null
          brand?: string | null
          business_status?: string | null
          category?: string
          cf_factors?: string | null
          chef_name?: string | null
          city?: string
          color_palette?: Json | null
          construction_year?: number | null
          content?: string | null
          country?: string | null
          created_at?: string | null
          crown?: boolean | null
          cuisine_type?: string[] | null
          currency_code?: string | null
          currency_updated_at?: string | null
          current_opening_hours_json?: Json | null
          current_weather_json?: Json | null
          data_quality_score?: number | null
          description?: string | null
          design_awards?: Json | null
          design_firm?: string | null
          design_firm_id?: string | null
          design_period?: string | null
          design_story?: string | null
          designer_name?: string | null
          dietary_options?: string[] | null
          distance_from_center_meters?: number | null
          dominant_colors?: string[] | null
          driving_time_from_center_minutes?: number | null
          editorial_summary?: string | null
          email?: string | null
          embedding?: string | null
          embedding_generated_at?: string | null
          embedding_model?: string | null
          embedding_needs_update?: boolean
          embedding_updated_at?: string | null
          embedding_version?: string | null
          enrichment_version?: number | null
          eventbrite_event_categories?: string[] | null
          eventbrite_event_count?: number | null
          eventbrite_total_attendance?: number | null
          eventbrite_updated_at?: string | null
          events_updated_at?: string | null
          exchange_rate_to_usd?: number | null
          experience_tags?: string[] | null
          formatted_address?: string | null
          gallery?: string[] | null
          google_maps_url?: string | null
          google_name?: string | null
          google_place_id?: string | null
          icon_background_color?: string | null
          icon_mask_base_uri?: string | null
          icon_url?: string | null
          id?: number
          image?: string | null
          image_captions?: Json | null
          image_original?: string | null
          image_thumbnail?: string | null
          instagram?: string | null
          instagram_engagement_score?: number | null
          instagram_handle?: string | null
          instagram_hashtag_count?: number | null
          instagram_post_count?: number | null
          instagram_total_comments?: number | null
          instagram_total_likes?: number | null
          instagram_trending_hashtags?: string[] | null
          instagram_updated_at?: string | null
          instagram_url?: string | null
          intelligence_score?: number | null
          interior_designer_id?: string | null
          interior_style?: string | null
          international_phone_number?: string | null
          is_open_now?: boolean | null
          keywords?: string[] | null
          last_enriched?: string | null
          last_enriched_at?: string | null
          last_indexed_at?: string | null
          lat?: number | null
          latitude?: number | null
          long?: number | null
          longitude?: number | null
          main_image?: string | null
          materials?: string[] | null
          michelin_keys?: number | null
          michelin_stars?: number | null
          micro_description?: string | null
          movement_id?: string | null
          name?: string
          nearby_destinations_json?: Json | null
          nearby_events_json?: Json | null
          nearby_updated_at?: string | null
          neighborhood?: string | null
          news_article_count?: number | null
          news_sentiment_score?: number | null
          news_top_sources?: string[] | null
          news_updated_at?: string | null
          opening_hours?: Json | null
          opening_hours_json?: Json | null
          opentable_url?: string | null
          parent_destination_id?: number | null
          parking_available?: boolean | null
          peak_season?: string | null
          phone_number?: string | null
          photo_analysis_json?: Json | null
          photo_count?: number | null
          photos_json?: Json | null
          place_id?: string | null
          place_types_json?: Json | null
          plus_code?: string | null
          popularity_score?: number | null
          price_level?: number | null
          price_range?: string | null
          price_range_local?: string | null
          primary_photo_url?: string | null
          rank_score?: number | null
          rating?: number | null
          reddit_mention_count?: number | null
          reddit_trending_subreddits?: string[] | null
          reddit_updated_at?: string | null
          reddit_upvote_score?: number | null
          related_destinations?: string[] | null
          renovation_history?: Json | null
          reservation_phone?: string | null
          resy_url?: string | null
          reviews_count?: number | null
          reviews_json?: Json | null
          route_from_city_center_json?: Json | null
          save_count?: number | null
          saves_count?: number | null
          search_keywords?: string[] | null
          search_text?: string | null
          secondary_opening_hours_json?: Json | null
          short_summary?: string | null
          slug?: string
          static_map_generated_at?: string | null
          static_map_url?: string | null
          style_tags?: string[] | null
          subline?: string | null
          tags?: string[] | null
          tiktok_engagement_score?: number | null
          tiktok_hashtag_count?: number | null
          tiktok_total_likes?: number | null
          tiktok_total_shares?: number | null
          tiktok_total_views?: number | null
          tiktok_trending_hashtags?: string[] | null
          tiktok_trending_score?: number | null
          tiktok_updated_at?: string | null
          tiktok_video_count?: number | null
          timezone_id?: string | null
          transit_time_from_center_minutes?: number | null
          trending_score?: number | null
          upcoming_event_count?: number | null
          user_ratings_total?: number | null
          utc_offset?: number | null
          vector_embedding?: string | null
          vibe_tags?: string[] | null
          vicinity?: string | null
          views_count?: number | null
          visits_count?: number | null
          walking_time_from_center_minutes?: number | null
          weather_forecast_json?: Json | null
          weather_updated_at?: string | null
          web_content_json?: Json | null
          web_content_updated_at?: string | null
          website?: string | null
          wheelchair_accessible?: boolean | null
          year_established?: number | null
          year_opened?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "destinations_architect_id_fkey"
            columns: ["architect_id"]
            isOneToOne: false
            referencedRelation: "architects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destinations_design_firm_id_fkey"
            columns: ["design_firm_id"]
            isOneToOne: false
            referencedRelation: "design_firms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destinations_interior_designer_id_fkey"
            columns: ["interior_designer_id"]
            isOneToOne: false
            referencedRelation: "architects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destinations_movement_id_fkey"
            columns: ["movement_id"]
            isOneToOne: false
            referencedRelation: "design_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destinations_parent_destination_id_fkey"
            columns: ["parent_destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      discovery_prompts: {
        Row: {
          action_text: string | null
          archetype: string | null
          booking_url: string | null
          category_filter: string | null
          city: string
          city_filter: string | null
          clicks: number | null
          country: string | null
          created_at: string | null
          created_by: string | null
          destination_slug: string | null
          end_date: string
          id: string
          impressions: number | null
          is_active: boolean | null
          is_recurring: boolean | null
          priority: number | null
          prompt_text: string
          prompt_type: string
          recurrence_end_day: number | null
          recurrence_end_month: number | null
          recurrence_pattern: string | null
          recurrence_start_day: number | null
          recurrence_start_month: number | null
          related_links: Json | null
          short_prompt: string | null
          start_date: string
          title: string
          updated_at: string | null
          variant_a: string | null
          variant_b: string | null
          weight: number | null
        }
        Insert: {
          action_text?: string | null
          archetype?: string | null
          booking_url?: string | null
          category_filter?: string | null
          city: string
          city_filter?: string | null
          clicks?: number | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          destination_slug?: string | null
          end_date: string
          id?: string
          impressions?: number | null
          is_active?: boolean | null
          is_recurring?: boolean | null
          priority?: number | null
          prompt_text: string
          prompt_type?: string
          recurrence_end_day?: number | null
          recurrence_end_month?: number | null
          recurrence_pattern?: string | null
          recurrence_start_day?: number | null
          recurrence_start_month?: number | null
          related_links?: Json | null
          short_prompt?: string | null
          start_date: string
          title: string
          updated_at?: string | null
          variant_a?: string | null
          variant_b?: string | null
          weight?: number | null
        }
        Update: {
          action_text?: string | null
          archetype?: string | null
          booking_url?: string | null
          category_filter?: string | null
          city?: string
          city_filter?: string | null
          clicks?: number | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          destination_slug?: string | null
          end_date?: string
          id?: string
          impressions?: number | null
          is_active?: boolean | null
          is_recurring?: boolean | null
          priority?: number | null
          prompt_text?: string
          prompt_type?: string
          recurrence_end_day?: number | null
          recurrence_end_month?: number | null
          recurrence_pattern?: string | null
          recurrence_start_day?: number | null
          recurrence_start_month?: number | null
          related_links?: Json | null
          short_prompt?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
          variant_a?: string | null
          variant_b?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discovery_prompts_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "discovery_prompts_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "enriched_destinations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "discovery_prompts_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "popular_destinations"
            referencedColumns: ["slug"]
          },
        ]
      }
      follow_cities: {
        Row: {
          city_slug: string
          followed_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          city_slug: string
          followed_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          city_slug?: string
          followed_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      forecasting_data: {
        Row: {
          created_at: string | null
          destination_id: number | null
          forecast_date: string | null
          id: string
          interest_score: number | null
          last_updated: string | null
          metadata: Json | null
          metric_type: string
          metric_value: number
          recorded_at: string
          trend_direction: string | null
        }
        Insert: {
          created_at?: string | null
          destination_id?: number | null
          forecast_date?: string | null
          id?: string
          interest_score?: number | null
          last_updated?: string | null
          metadata?: Json | null
          metric_type: string
          metric_value: number
          recorded_at: string
          trend_direction?: string | null
        }
        Update: {
          created_at?: string | null
          destination_id?: number | null
          forecast_date?: string | null
          id?: string
          interest_score?: number | null
          last_updated?: string | null
          metadata?: Json | null
          metric_type?: string
          metric_value?: number
          recorded_at?: string
          trend_direction?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecasting_data_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      "Framer CMS": {
        Row: {
          "Architect / Interior": string | null
          Brand: string | null
          "Card Tags": string | null
          Category: string | null
          City: string | null
          Content: string | null
          Crown: boolean | null
          Lat: string | null
          "Local Language": string | null
          Location: string | null
          Long: string | null
          "Main Image": string | null
          "Main Image:alt": string | null
          "Michelin Stars": string | null
          "My Rating": string | null
          Person: string | null
          Reviewed: boolean | null
          Slug: string
          Subline: string | null
          Title: string | null
        }
        Insert: {
          "Architect / Interior"?: string | null
          Brand?: string | null
          "Card Tags"?: string | null
          Category?: string | null
          City?: string | null
          Content?: string | null
          Crown?: boolean | null
          Lat?: string | null
          "Local Language"?: string | null
          Location?: string | null
          Long?: string | null
          "Main Image"?: string | null
          "Main Image:alt"?: string | null
          "Michelin Stars"?: string | null
          "My Rating"?: string | null
          Person?: string | null
          Reviewed?: boolean | null
          Slug: string
          Subline?: string | null
          Title?: string | null
        }
        Update: {
          "Architect / Interior"?: string | null
          Brand?: string | null
          "Card Tags"?: string | null
          Category?: string | null
          City?: string | null
          Content?: string | null
          Crown?: boolean | null
          Lat?: string | null
          "Local Language"?: string | null
          Location?: string | null
          Long?: string | null
          "Main Image"?: string | null
          "Main Image:alt"?: string | null
          "Michelin Stars"?: string | null
          "My Rating"?: string | null
          Person?: string | null
          Reviewed?: boolean | null
          Slug?: string
          Subline?: string | null
          Title?: string | null
        }
        Relationships: []
      }
      intelligence_insights: {
        Row: {
          city: string | null
          confidence_score: number | null
          created_at: string | null
          destination_id: number | null
          id: string
          insight_type: string | null
          payload: Json | null
          relevance_score: number | null
          score: number | null
          user_id: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          city?: string | null
          confidence_score?: number | null
          created_at?: string | null
          destination_id?: number | null
          id?: string
          insight_type?: string | null
          payload?: Json | null
          relevance_score?: number | null
          score?: number | null
          user_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          city?: string | null
          confidence_score?: number | null
          created_at?: string | null
          destination_id?: number | null
          id?: string
          insight_type?: string | null
          payload?: Json | null
          relevance_score?: number | null
          score?: number | null
          user_id?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intelligence_insights_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          is_archived: boolean | null
          is_public: boolean | null
          name: string
          slug: string | null
          start_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_archived?: boolean | null
          is_public?: boolean | null
          name: string
          slug?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          is_archived?: boolean | null
          is_public?: boolean | null
          name?: string
          slug?: string | null
          start_date?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      itinerary_days: {
        Row: {
          created_at: string | null
          date: string
          day_number: number
          id: string
          itinerary_id: string
          notes: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          day_number: number
          id?: string
          itinerary_id: string
          notes?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          day_number?: number
          id?: string
          itinerary_id?: string
          notes?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_days_itinerary_id_fkey"
            columns: ["itinerary_id"]
            isOneToOne: false
            referencedRelation: "itineraries"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_items: {
        Row: {
          created_at: string | null
          day: number
          description: string | null
          destination_slug: string | null
          id: string
          is_completed: boolean | null
          itinerary_day_id: string | null
          notes: string | null
          order_index: number
          position: number | null
          time: string | null
          title: string
          trip_id: string
        }
        Insert: {
          created_at?: string | null
          day: number
          description?: string | null
          destination_slug?: string | null
          id?: string
          is_completed?: boolean | null
          itinerary_day_id?: string | null
          notes?: string | null
          order_index: number
          position?: number | null
          time?: string | null
          title: string
          trip_id: string
        }
        Update: {
          created_at?: string | null
          day?: number
          description?: string | null
          destination_slug?: string | null
          id?: string
          is_completed?: boolean | null
          itinerary_day_id?: string | null
          notes?: string | null
          order_index?: number
          position?: number | null
          time?: string | null
          title?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_items_itinerary_day_id_fkey"
            columns: ["itinerary_day_id"]
            isOneToOne: false
            referencedRelation: "itinerary_days"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_items_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_templates: {
        Row: {
          city: string
          destinations: Json
          duration_days: number
          generated_at: string | null
          id: string
          is_active: boolean | null
          optimization_criteria: Json | null
          template_name: string | null
          user_id: string | null
        }
        Insert: {
          city: string
          destinations: Json
          duration_days: number
          generated_at?: string | null
          id?: string
          is_active?: boolean | null
          optimization_criteria?: Json | null
          template_name?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string
          destinations?: Json
          duration_days?: number
          generated_at?: string | null
          id?: string
          is_active?: boolean | null
          optimization_criteria?: Json | null
          template_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      kv_store_14e1d2af: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      kv_store_56adcd7e: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      kv_store_5cb48f8d: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      kv_store_899d8419: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      kv_store_f97351a0: {
        Row: {
          key: string
          value: Json
        }
        Insert: {
          key: string
          value: Json
        }
        Update: {
          key?: string
          value?: Json
        }
        Relationships: []
      }
      list_destinations: {
        Row: {
          created_at: string | null
          destination_id: number | null
          id: string
          list_id: string | null
          note: string | null
          position: number | null
        }
        Insert: {
          created_at?: string | null
          destination_id?: number | null
          id?: string
          list_id?: string | null
          note?: string | null
          position?: number | null
        }
        Update: {
          created_at?: string | null
          destination_id?: number | null
          id?: string
          list_id?: string | null
          note?: string | null
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "list_destinations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "list_destinations_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
        ]
      }
      list_items: {
        Row: {
          added_by: string | null
          created_at: string | null
          destination_slug: string
          id: string
          list_id: string
          note: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          destination_slug: string
          id?: string
          list_id: string
          note?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          destination_slug?: string
          id?: string
          list_id?: string
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
        ]
      }
      list_likes: {
        Row: {
          created_at: string | null
          id: string
          list_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          list_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          list_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "list_likes_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
        ]
      }
      lists: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          is_collaborative: boolean | null
          is_public: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_collaborative?: boolean | null
          is_public?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_collaborative?: boolean | null
          is_public?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          country: string
          created_at: string | null
          cultural_notes: string | null
          description: string | null
          embedding: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          nearby_locations: Json | null
          neighborhood_type: string | null
          parent_city: string
          updated_at: string | null
          walking_time: Json | null
        }
        Insert: {
          country: string
          created_at?: string | null
          cultural_notes?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          nearby_locations?: Json | null
          neighborhood_type?: string | null
          parent_city: string
          updated_at?: string | null
          walking_time?: Json | null
        }
        Update: {
          country?: string
          created_at?: string | null
          cultural_notes?: string | null
          description?: string | null
          embedding?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          nearby_locations?: Json | null
          neighborhood_type?: string | null
          parent_city?: string
          updated_at?: string | null
          walking_time?: Json | null
        }
        Relationships: []
      }
      materials: {
        Row: {
          common_uses: string[] | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          common_uses?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          common_uses?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          from_user_id: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          from_user_id?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      opportunity_alerts: {
        Row: {
          alert_type: string | null
          category: string | null
          city: string | null
          created_at: string | null
          description: string | null
          destination_id: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          opportunity_data: Json
          opportunity_type: string
          read: boolean | null
          severity: string | null
          title: string
          triggered_at: string | null
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          alert_type?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          opportunity_data?: Json
          opportunity_type: string
          read?: boolean | null
          severity?: string | null
          title: string
          triggered_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string | null
          category?: string | null
          city?: string | null
          created_at?: string | null
          description?: string | null
          destination_id?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          opportunity_data?: Json
          opportunity_type?: string
          read?: boolean | null
          severity?: string | null
          title?: string
          triggered_at?: string | null
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunity_alerts_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      personalization_scores: {
        Row: {
          cache: Json | null
          cache_key: string | null
          created_at: string | null
          id: string
          ttl: string | null
          user_id: string | null
        }
        Insert: {
          cache?: Json | null
          cache_key?: string | null
          created_at?: string | null
          id?: string
          ttl?: string | null
          user_id?: string | null
        }
        Update: {
          cache?: Json | null
          cache_key?: string | null
          created_at?: string | null
          id?: string
          ttl?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      place_likes: {
        Row: {
          created_at: string | null
          destination_slug: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          destination_slug: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          destination_slug?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      price_alerts: {
        Row: {
          alert_type: string | null
          created_at: string | null
          destination_id: number | null
          id: string
          is_active: boolean | null
          last_triggered_at: string | null
          threshold_value: Json | null
          user_id: string | null
        }
        Insert: {
          alert_type?: string | null
          created_at?: string | null
          destination_id?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          threshold_value?: Json | null
          user_id?: string | null
        }
        Update: {
          alert_type?: string | null
          created_at?: string | null
          destination_id?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          threshold_value?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_alerts_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          implicit_interests: Json | null
          instagram_handle: string | null
          taste_profile: Json | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          implicit_interests?: Json | null
          instagram_handle?: string | null
          taste_profile?: Json | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          implicit_interests?: Json | null
          instagram_handle?: string | null
          taste_profile?: Json | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      recommendation_cache: {
        Row: {
          algorithm: string
          created_at: string | null
          expires_at: string | null
          generated_at: string | null
          id: string
          recommendations: Json
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          algorithm: string
          created_at?: string | null
          expires_at?: string | null
          generated_at?: string | null
          id?: string
          recommendations: Json
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          algorithm?: string
          created_at?: string | null
          expires_at?: string | null
          generated_at?: string | null
          id?: string
          recommendations?: Json
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      review_helpful: {
        Row: {
          created_at: string | null
          id: string
          review_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          review_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_helpful_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string
          created_at: string | null
          destination_slug: string
          helpful_count: number | null
          id: string
          photos: string[] | null
          rating: number
          title: string | null
          updated_at: string | null
          user_id: string
          visit_date: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          destination_slug: string
          helpful_count?: number | null
          id?: string
          photos?: string[] | null
          rating: number
          title?: string | null
          updated_at?: string | null
          user_id: string
          visit_date?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          destination_slug?: string
          helpful_count?: number | null
          id?: string
          photos?: string[] | null
          rating?: number
          title?: string | null
          updated_at?: string | null
          user_id?: string
          visit_date?: string | null
        }
        Relationships: []
      }
      saved_places: {
        Row: {
          created_at: string | null
          destination_slug: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          destination_slug: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          destination_slug?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      trip_collaborators: {
        Row: {
          accepted_at: string | null
          created_at: string | null
          id: string
          invited_by: string
          invited_email: string | null
          role: string
          status: string
          trip_id: string
          user_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          invited_by: string
          invited_email?: string | null
          role?: string
          status?: string
          trip_id: string
          user_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string | null
          id?: string
          invited_by?: string
          invited_email?: string | null
          role?: string
          status?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_collaborators_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_invites: {
        Row: {
          created_at: string | null
          email: string
          id: string
          invite_token: string
          invited_by: string
          role: string
          trip_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          invite_token: string
          invited_by: string
          role?: string
          trip_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          invite_token?: string
          invited_by?: string
          role?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_invites_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trip_shares: {
        Row: {
          access_level: string
          created_at: string | null
          created_by: string
          id: string
          share_token: string
          trip_id: string
        }
        Insert: {
          access_level?: string
          created_at?: string | null
          created_by: string
          id?: string
          share_token: string
          trip_id: string
        }
        Update: {
          access_level?: string
          created_at?: string | null
          created_by?: string
          id?: string
          share_token?: string
          trip_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trip_shares_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: true
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          destination: string | null
          end_date: string | null
          id: string
          is_public: boolean
          start_date: string | null
          status: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination?: string | null
          end_date?: string | null
          id?: string
          is_public?: boolean
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          destination?: string | null
          end_date?: string | null
          id?: string
          is_public?: boolean
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_code: string
          achievement_description: string | null
          achievement_name: string
          icon: string | null
          id: string
          metadata: Json | null
          progress: number | null
          tier: string | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_code: string
          achievement_description?: string | null
          achievement_name: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          progress?: number | null
          tier?: string | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_code?: string
          achievement_description?: string | null
          achievement_name?: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          progress?: number | null
          tier?: string | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_follows: {
        Row: {
          created_at: string | null
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string | null
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string | null
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: []
      }
      user_interactions: {
        Row: {
          category: string | null
          city: string | null
          context: Json | null
          created_at: string | null
          destination_id: number | null
          destination_slug: string | null
          duration_seconds: number | null
          engagement_score: number | null
          id: string
          interaction_type: string
          metadata: Json | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          context?: Json | null
          created_at?: string | null
          destination_id?: number | null
          destination_slug?: string | null
          duration_seconds?: number | null
          engagement_score?: number | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          context?: Json | null
          created_at?: string | null
          destination_id?: number | null
          destination_slug?: string | null
          duration_seconds?: number | null
          engagement_score?: number | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_interactions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interactions_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "user_interactions_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "enriched_destinations"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "user_interactions_destination_slug_fkey"
            columns: ["destination_slug"]
            isOneToOne: false
            referencedRelation: "popular_destinations"
            referencedColumns: ["slug"]
          },
        ]
      }
      user_preferences: {
        Row: {
          category_scores: Json | null
          city_scores: Json | null
          created_at: string | null
          last_updated: string | null
          preferred_times: Json | null
          style_preferences: Json | null
          user_id: string
        }
        Insert: {
          category_scores?: Json | null
          city_scores?: Json | null
          created_at?: string | null
          last_updated?: string | null
          preferred_times?: Json | null
          style_preferences?: Json | null
          user_id: string
        }
        Update: {
          category_scores?: Json | null
          city_scores?: Json | null
          created_at?: string | null
          last_updated?: string | null
          preferred_times?: Json | null
          style_preferences?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences_evolution: {
        Row: {
          context: string | null
          created_at: string | null
          first_observed: string | null
          id: string
          last_observed: string | null
          observation_count: number | null
          preference_type: string
          preference_value: string
          strength: number | null
          trend: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context?: string | null
          created_at?: string | null
          first_observed?: string | null
          id?: string
          last_observed?: string | null
          observation_count?: number | null
          preference_type: string
          preference_value: string
          strength?: number | null
          trend?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context?: string | null
          created_at?: string | null
          first_observed?: string | null
          id?: string
          last_observed?: string | null
          observation_count?: number | null
          preference_type?: string
          preference_value?: string
          strength?: number | null
          trend?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          birthday: string | null
          cover_image: string | null
          created_at: string | null
          display_name: string | null
          follower_count: number | null
          following_count: number | null
          id: string
          is_public: boolean | null
          location: string | null
          profile_photo: string | null
          travel_style: string[] | null
          updated_at: string | null
          user_id: string
          username: string
          website: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          cover_image?: string | null
          created_at?: string | null
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          profile_photo?: string | null
          travel_style?: string[] | null
          updated_at?: string | null
          user_id: string
          username: string
          website?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          birthday?: string | null
          cover_image?: string | null
          created_at?: string | null
          display_name?: string | null
          follower_count?: number | null
          following_count?: number | null
          id?: string
          is_public?: boolean | null
          location?: string | null
          profile_photo?: string | null
          travel_style?: string[] | null
          updated_at?: string | null
          user_id?: string
          username?: string
          website?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      user_reports: {
        Row: {
          created_at: string | null
          destination_id: number | null
          downvotes: number | null
          expires_at: string | null
          id: string
          report_data: Json | null
          report_type: string | null
          upvotes: number | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          destination_id?: number | null
          downvotes?: number | null
          expires_at?: string | null
          id?: string
          report_data?: Json | null
          report_type?: string | null
          upvotes?: number | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          destination_id?: number | null
          downvotes?: number | null
          expires_at?: string | null
          id?: string
          report_data?: Json | null
          report_type?: string | null
          upvotes?: number | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_reports_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          device_type: string | null
          ended_at: string | null
          id: string
          location_city: string | null
          location_country: string | null
          referrer: string | null
          session_id: string
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_type?: string | null
          ended_at?: string | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          referrer?: string | null
          session_id: string
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_type?: string | null
          ended_at?: string | null
          id?: string
          location_city?: string | null
          location_country?: string | null
          referrer?: string | null
          session_id?: string
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      visited_countries: {
        Row: {
          country_code: string
          country_name: string
          id: string
          user_id: string
          visited_at: string | null
        }
        Insert: {
          country_code: string
          country_name: string
          id?: string
          user_id: string
          visited_at?: string | null
        }
        Update: {
          country_code?: string
          country_name?: string
          id?: string
          user_id?: string
          visited_at?: string | null
        }
        Relationships: []
      }
      visited_place_photos: {
        Row: {
          caption: string | null
          destination_slug: string
          id: string
          is_primary: boolean | null
          photo_url: string
          uploaded_at: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          destination_slug: string
          id?: string
          is_primary?: boolean | null
          photo_url: string
          uploaded_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          destination_slug?: string
          id?: string
          is_primary?: boolean | null
          photo_url?: string
          uploaded_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      visited_places: {
        Row: {
          destination_slug: string
          id: string
          notes: string | null
          rating: number | null
          user_id: string
          visited_at: string | null
        }
        Insert: {
          destination_slug: string
          id?: string
          notes?: string | null
          rating?: number | null
          user_id: string
          visited_at?: string | null
        }
        Update: {
          destination_slug?: string
          id?: string
          notes?: string | null
          rating?: number | null
          user_id?: string
          visited_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      enriched_destinations: {
        Row: {
          category: string | null
          city: string | null
          content: string | null
          crown: boolean | null
          google_maps_url: string | null
          image: string | null
          is_enriched: boolean | null
          last_enriched_at: string | null
          michelin_stars: number | null
          name: string | null
          opening_hours: Json | null
          phone_number: string | null
          place_id: string | null
          price_level: number | null
          rating: number | null
          slug: string | null
          tags: string[] | null
          website: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          content?: string | null
          crown?: boolean | null
          google_maps_url?: string | null
          image?: string | null
          is_enriched?: never
          last_enriched_at?: string | null
          michelin_stars?: number | null
          name?: string | null
          opening_hours?: Json | null
          phone_number?: string | null
          place_id?: string | null
          price_level?: number | null
          rating?: number | null
          slug?: string | null
          tags?: string[] | null
          website?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          content?: string | null
          crown?: boolean | null
          google_maps_url?: string | null
          image?: string | null
          is_enriched?: never
          last_enriched_at?: string | null
          michelin_stars?: number | null
          name?: string | null
          opening_hours?: Json | null
          phone_number?: string | null
          place_id?: string | null
          price_level?: number | null
          rating?: number | null
          slug?: string | null
          tags?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      popular_destinations: {
        Row: {
          category: string | null
          city: string | null
          image: string | null
          name: string | null
          slug: string | null
        }
        Insert: {
          category?: string | null
          city?: string | null
          image?: never
          name?: string | null
          slug?: string | null
        }
        Update: {
          category?: string | null
          city?: string | null
          image?: never
          name?: string | null
          slug?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      archive_old_threads: {
        Args: { p_days?: number; p_user_id: string }
        Returns: number
      }
      calculate_distance_km: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      can_access_trip: {
        Args: { p_share_token?: string; p_trip_id: string; p_user_id?: string }
        Returns: {
          access_type: string
          can_edit: boolean
          can_view: boolean
        }[]
      }
      check_and_award_achievements: {
        Args: { p_user_id: string }
        Returns: {
          achievement_code: string
          achievement_description: string | null
          achievement_name: string
          icon: string | null
          id: string
          metadata: Json | null
          progress: number | null
          tier: string | null
          unlocked_at: string | null
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "user_achievements"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      check_trip_ownership_bypass_rls_for_items: {
        Args: { trip_uuid: string }
        Returns: boolean
      }
      compute_co_visitation: { Args: never; Returns: undefined }
      compute_destination_relationships: { Args: never; Returns: undefined }
      compute_enhanced_social_trending_scores: {
        Args: never
        Returns: undefined
      }
      compute_multi_source_trending_scores: { Args: never; Returns: undefined }
      compute_rank_scores: { Args: never; Returns: undefined }
      compute_trending_scores: { Args: never; Returns: undefined }
      create_notification: {
        Args: {
          p_from_user_id?: string
          p_link?: string
          p_message: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      destinations_nearby: {
        Args: {
          radius_km: number
          result_limit?: number
          user_lat: number
          user_lng: number
        }
        Returns: {
          category: string
          city: string
          content: string
          crown: boolean
          description: string
          distance_km: number
          distance_miles: number
          id: number
          image: string
          latitude: number
          longitude: number
          michelin_stars: number
          name: string
          price_level: number
          rating: number
          slug: string
        }[]
      }
      earth: { Args: never; Returns: number }
      end_session: { Args: { p_session_id: string }; Returns: undefined }
      generate_collection_slug: {
        Args: { collection_name: string; user_id: string }
        Returns: string
      }
      generate_share_token: { Args: never; Returns: string }
      get_active_prompts_for_city: {
        Args: { p_city: string; p_date?: string }
        Returns: {
          action_text: string
          booking_url: string
          city: string
          destination_slug: string
          id: string
          priority: number
          prompt_text: string
          prompt_type: string
          related_links: Json
          short_prompt: string
          title: string
        }[]
      }
      get_active_prompts_for_destination: {
        Args: { p_date?: string; p_destination_slug: string }
        Returns: {
          action_text: string
          booking_url: string
          city: string
          destination_slug: string
          id: string
          priority: number
          prompt_text: string
          prompt_type: string
          related_links: Json
          short_prompt: string
          title: string
        }[]
      }
      get_active_thread: { Args: { p_user_id: string }; Returns: string }
      get_all_nested_destinations: {
        Args: { parent_id: number }
        Returns: {
          architect_id: string
          category: string
          city: string
          content: string
          country: string
          created_at: string
          crown: boolean
          description: string
          design_firm_id: string
          id: number
          image: string
          image_thumbnail: string
          interior_designer_id: string
          latitude: number
          longitude: number
          michelin_stars: number
          movement_id: string
          name: string
          parent_destination_id: number
          price_level: number
          rating: number
          slug: string
          updated_at: string
        }[]
      }
      get_conversation_history: {
        Args: { p_limit?: number; p_session_id: string }
        Returns: {
          content: string
          created_at: string
          destinations: Json
          intent_data: Json
          role: string
        }[]
      }
      get_destination_history: {
        Args: { p_limit?: number; p_slug: string }
        Returns: {
          action: string
          changes: Json
          conflicts: Json
          created_at: string
          id: string
          source: string
        }[]
      }
      get_destination_user_status: {
        Args: { destination_slug_param: string; target_user_id: string }
        Returns: {
          is_saved: boolean
          is_visited: boolean
          saved_at: string
          visited_at: string
        }[]
      }
      get_destinations_by_architect: {
        Args: { architect_slug: string }
        Returns: {
          category: string
          city: string
          id: number
          image: string
          name: string
          slug: string
        }[]
      }
      get_destinations_by_movement: {
        Args: { movement_slug: string }
        Returns: {
          category: string
          city: string
          id: number
          image: string
          name: string
          slug: string
        }[]
      }
      get_nested_destinations: {
        Args: { parent_id: number }
        Returns: {
          architect_id: string
          category: string
          city: string
          content: string
          country: string
          created_at: string
          crown: boolean
          description: string
          design_firm_id: string
          id: number
          image: string
          image_thumbnail: string
          interior_designer_id: string
          latitude: number
          longitude: number
          michelin_stars: number
          movement_id: string
          name: string
          parent_destination_id: number
          price_level: number
          rating: number
          slug: string
          updated_at: string
        }[]
      }
      get_next_itinerary_order: {
        Args: { p_day?: number; p_trip_id: string }
        Returns: {
          next_day: number
          next_order: number
        }[]
      }
      get_or_create_session: {
        Args: { p_session_token?: string; p_user_id?: string }
        Returns: string
      }
      get_popular_destinations: {
        Args: { limit_count?: number }
        Returns: {
          destination_slug: string
          save_count: number
          unique_users: number
        }[]
      }
      get_primary_cities: {
        Args: never
        Returns: {
          city: string
        }[]
      }
      get_recent_conflicts: {
        Args: { p_hours?: number; p_limit?: number }
        Returns: {
          conflicts: Json
          created_at: string
          document_id: string
          id: string
          slug: string
        }[]
      }
      get_trending_destinations: {
        Args: { days?: number; limit_count?: number }
        Returns: {
          destination_slug: string
          recent_saves: number
        }[]
      }
      get_user_saved_destinations: {
        Args: { target_user_id: string }
        Returns: {
          category: string
          city: string
          content: string
          id: number
          image_url: string
          michelin_stars: number
          name: string
          price_level: number
          rating: number
          saved_at: string
          slug: string
          tags: string[]
          user_notes: string
          user_tags: string[]
        }[]
      }
      get_user_stats: {
        Args: { user_uuid: string }
        Returns: {
          total_saved: number
          total_visited: number
          unique_categories: number
          unique_cities: number
        }[]
      }
      get_user_visited_destinations: {
        Args: { target_user_id: string }
        Returns: {
          category: string
          city: string
          content: string
          id: number
          image_url: string
          michelin_stars: number
          name: string
          price_level: number
          rating: number
          slug: string
          tags: string[]
          user_notes: string
          user_rating: number
          visited_at: string
        }[]
      }
      increment_saves: { Args: { dest_slug: string }; Returns: undefined }
      increment_views: { Args: { dest_id: number }; Returns: undefined }
      increment_views_by_slug: {
        Args: { dest_slug: string }
        Returns: undefined
      }
      match_destinations:
        | {
            Args: {
              filter_category?: string
              filter_city?: string
              filter_max_price_level?: number
              filter_michelin_stars?: number
              filter_min_rating?: number
              match_count?: number
              match_threshold?: number
              query_embedding: string
              search_query?: string
            }
            Returns: {
              category: string
              city: string
              content: string
              crown: boolean
              description: string
              image: string
              michelin_stars: number
              name: string
              price_level: number
              rank: number
              rating: number
              similarity: number
              slug: string
            }[]
          }
        | {
            Args: {
              filter_brand?: string
              filter_category?: string
              filter_city?: string
              filter_max_price_level?: number
              filter_michelin_stars?: number
              filter_min_rating?: number
              match_count?: number
              match_threshold?: number
              query_embedding: string
              search_query?: string
            }
            Returns: {
              ai_keywords: string[]
              ai_short_summary: string
              ai_vibe_tags: string[]
              architect: string
              brand: string
              category: string
              city: string
              content: string
              country: string
              crown: boolean
              description: string
              id: number
              image: string
              michelin_stars: number
              name: string
              neighborhood: string
              price_level: number
              rating: number
              similarity: number
              slug: string
              tags: string[]
            }[]
          }
      migrate_architect_from_text: { Args: never; Returns: undefined }
      refresh_destination_stats: { Args: never; Returns: undefined }
      search_by_ai_fields: {
        Args: { match_count?: number; search_term: string }
        Returns: {
          category: string
          city: string
          description: string
          name: string
          similarity: number
          slug: string
        }[]
      }
      search_destinations: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding?: string
          query_text: string
        }
        Returns: {
          category: string
          city: string
          id: number
          name: string
          similarity: number
        }[]
      }
      search_destinations_hybrid: {
        Args: {
          boost_saved?: boolean
          category_filter?: string
          city_filter?: string
          include_saved_only?: boolean
          limit_count?: number
          michelin_only?: boolean
          price_max?: number
          query_embedding: string
          rating_min?: number
          tags_filter?: string[]
          user_id_param?: string
        }
        Returns: {
          category: string
          city: string
          content: string
          final_score: number
          id: number
          image_url: string
          is_saved: boolean
          is_visited: boolean
          michelin_stars: number
          name: string
          price_level: number
          rating: number
          similarity: number
          slug: string
          tags: string[]
        }[]
      }
      search_destinations_intelligent: {
        Args: {
          category_filter?: string
          city_filter?: string
          limit_count?: number
          open_now_filter?: boolean
          query_embedding: string
          user_id_param?: string
        }
        Returns: {
          category: string
          city: string
          content: string
          description: string
          final_score: number
          id: number
          image_url: string
          is_open_now: boolean
          is_saved: boolean
          michelin_stars: number
          name: string
          price_level: number
          rank_score: number
          rating: number
          similarity_score: number
          slug: string
          trending_score: number
        }[]
      }
      search_tags: {
        Args: { search_term: string }
        Returns: {
          name: string
          slug: string
          tags: string[]
        }[]
      }
      update_destination_embedding: {
        Args: { p_embedding: string; p_search_text: string; p_slug: string }
        Returns: undefined
      }
      update_session_context: {
        Args: { p_context: Json; p_session_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
