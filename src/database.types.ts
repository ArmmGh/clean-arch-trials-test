export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admins: {
        Row: {
          address: string
          environment: Database["public"]["Enums"]["env_type"]
          id: string
          last_login: string | null
          session_expiry: string | null
          session_token: string | null
        }
        Insert: {
          address: string
          environment: Database["public"]["Enums"]["env_type"]
          id?: string
          last_login?: string | null
          session_expiry?: string | null
          session_token?: string | null
        }
        Update: {
          address?: string
          environment?: Database["public"]["Enums"]["env_type"]
          id?: string
          last_login?: string | null
          session_expiry?: string | null
          session_token?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          announcement_type: Database["public"]["Enums"]["announcementtype"]
          id: number
          message: string | null
          price_paid: number | null
          source_id: number | null
          source_type: string | null
          tower_id: number | null
        }
        Insert: {
          announcement_type: Database["public"]["Enums"]["announcementtype"]
          id?: number
          message?: string | null
          price_paid?: number | null
          source_id?: number | null
          source_type?: string | null
          tower_id?: number | null
        }
        Update: {
          announcement_type?: Database["public"]["Enums"]["announcementtype"]
          id?: number
          message?: string | null
          price_paid?: number | null
          source_id?: number | null
          source_type?: string | null
          tower_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_tower_id_fkey"
            columns: ["tower_id"]
            isOneToOne: false
            referencedRelation: "towers"
            referencedColumns: ["id"]
          },
        ]
      }
      behavior_blocked_channels: {
        Row: {
          behavior_id: number | null
          channel_id: number | null
          id: number
        }
        Insert: {
          behavior_id?: number | null
          channel_id?: number | null
          id?: number
        }
        Update: {
          behavior_id?: number | null
          channel_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "behavior_blocked_channels_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behavior_blocked_channels_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      behavior_followed_channels: {
        Row: {
          behavior_id: number | null
          channel_id: number | null
          id: number
        }
        Insert: {
          behavior_id?: number | null
          channel_id?: number | null
          id?: number
        }
        Update: {
          behavior_id?: number | null
          channel_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "behavior_followed_channels_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behavior_followed_channels_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      behavior_interested_topics: {
        Row: {
          behavior_id: number | null
          id: number
          topic: Database["public"]["Enums"]["topic"] | null
        }
        Insert: {
          behavior_id?: number | null
          id?: number
          topic?: Database["public"]["Enums"]["topic"] | null
        }
        Update: {
          behavior_id?: number | null
          id?: number
          topic?: Database["public"]["Enums"]["topic"] | null
        }
        Relationships: [
          {
            foreignKeyName: "behavior_interested_topics_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
        ]
      }
      behavior_liked_publications: {
        Row: {
          behavior_id: number | null
          id: number
          publication_id: number | null
        }
        Insert: {
          behavior_id?: number | null
          id?: number
          publication_id?: number | null
        }
        Update: {
          behavior_id?: number | null
          id?: number
          publication_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "behavior_liked_publications_behavior_id_fkey"
            columns: ["behavior_id"]
            isOneToOne: false
            referencedRelation: "behaviors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behavior_liked_publications_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      behaviors: {
        Row: {
          consumer_address: string
          created_at: string | null
          id: number
          profile_picture_url: string | null
          username: string | null
        }
        Insert: {
          consumer_address: string
          created_at?: string | null
          id?: number
          profile_picture_url?: string | null
          username?: string | null
        }
        Update: {
          consumer_address?: string
          created_at?: string | null
          id?: number
          profile_picture_url?: string | null
          username?: string | null
        }
        Relationships: []
      }
      channel_notifications: {
        Row: {
          channel_address: string
          created_at: string
          id: number
          last_read_timestamp: string
          user_address: string
        }
        Insert: {
          channel_address: string
          created_at?: string
          id?: number
          last_read_timestamp?: string
          user_address: string
        }
        Update: {
          channel_address?: string
          created_at?: string
          id?: number
          last_read_timestamp?: string
          user_address?: string
        }
        Relationships: []
      }
      channel_requests: {
        Row: {
          channel_address: string
          channel_owner: string
          created_at: string
          environment: Database["public"]["Enums"]["env_type"]
          id: number
          status: Database["public"]["Enums"]["channel_request_status"]
        }
        Insert: {
          channel_address: string
          channel_owner: string
          created_at?: string
          environment?: Database["public"]["Enums"]["env_type"]
          id?: number
          status: Database["public"]["Enums"]["channel_request_status"]
        }
        Update: {
          channel_address?: string
          channel_owner?: string
          created_at?: string
          environment?: Database["public"]["Enums"]["env_type"]
          id?: number
          status?: Database["public"]["Enums"]["channel_request_status"]
        }
        Relationships: []
      }
      channels: {
        Row: {
          avatar_url: string | null
          channel_address: string
          created_at: string | null
          description: string | null
          env_type: Database["public"]["Enums"]["env_type"] | null
          id: number
          name: string | null
          verification_status:
            | Database["public"]["Enums"]["verificationstatus"]
            | null
        }
        Insert: {
          avatar_url?: string | null
          channel_address: string
          created_at?: string | null
          description?: string | null
          env_type?: Database["public"]["Enums"]["env_type"] | null
          id?: number
          name?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verificationstatus"]
            | null
        }
        Update: {
          avatar_url?: string | null
          channel_address?: string
          created_at?: string | null
          description?: string | null
          env_type?: Database["public"]["Enums"]["env_type"] | null
          id?: number
          name?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verificationstatus"]
            | null
        }
        Relationships: []
      }
      followers: {
        Row: {
          channel_address: string
          created_at: string
          id: number
          user_address: string
        }
        Insert: {
          channel_address: string
          created_at?: string
          id?: number
          user_address: string
        }
        Update: {
          channel_address?: string
          created_at?: string
          id?: number
          user_address?: string
        }
        Relationships: []
      }
      publication_assessment: {
        Row: {
          adult_likelihood: Database["public"]["Enums"]["likelihood"] | null
          assessed_at: string | null
          id: number
          medical_likelihood: Database["public"]["Enums"]["likelihood"] | null
          publication_id: number | null
          racy_likelihood: Database["public"]["Enums"]["likelihood"] | null
          spoof_likelihood: Database["public"]["Enums"]["likelihood"] | null
          violence_likelihood: Database["public"]["Enums"]["likelihood"] | null
        }
        Insert: {
          adult_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          assessed_at?: string | null
          id?: number
          medical_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          publication_id?: number | null
          racy_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          spoof_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          violence_likelihood?: Database["public"]["Enums"]["likelihood"] | null
        }
        Update: {
          adult_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          assessed_at?: string | null
          id?: number
          medical_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          publication_id?: number | null
          racy_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          spoof_likelihood?: Database["public"]["Enums"]["likelihood"] | null
          violence_likelihood?: Database["public"]["Enums"]["likelihood"] | null
        }
        Relationships: [
          {
            foreignKeyName: "publication_assessment_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      publication_topics: {
        Row: {
          publication_id: number
          topic: Database["public"]["Enums"]["topic"]
        }
        Insert: {
          publication_id: number
          topic: Database["public"]["Enums"]["topic"]
        }
        Update: {
          publication_id?: number
          topic?: Database["public"]["Enums"]["topic"]
        }
        Relationships: [
          {
            foreignKeyName: "publication_topics_publication_id_fkey"
            columns: ["publication_id"]
            isOneToOne: false
            referencedRelation: "publications"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          channel_id: number | null
          id: number
          publication_address: string
          publication_index: number | null
        }
        Insert: {
          channel_id?: number | null
          id?: number
          publication_address: string
          publication_index?: number | null
        }
        Update: {
          channel_id?: number | null
          id?: number
          publication_address?: string
          publication_index?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "publications_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      towers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          tower_address: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          tower_address: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          tower_address?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      announcementtype:
        | "ChannelAnnounced"
        | "PublicationAnnounced"
        | "MessageAnnounced"
      channel_request_status: "pending" | "whitelisted" | "blacklisted"
      env_type: "development" | "test" | "production"
      likelihood:
        | "Unknown"
        | "VeryUnlikely"
        | "Unlikely"
        | "Possible"
        | "Likely"
        | "Verylikely"
      topic:
        | "Sports"
        | "Politics"
        | "Economics"
        | "Technology"
        | "Entertainment"
        | "Health"
      verificationstatus: "Unverified" | "Verified" | "Pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
