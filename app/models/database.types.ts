export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          created_at: string
          id: number
          name: string | null
          path: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          path?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          path?: string | null
        }
        Relationships: []
      }
      comment: {
        Row: {
          content: string | null
          created_at: string
          id: number
          password: string | null
          post_id: number
          writer: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          password?: string | null
          post_id: number
          writer: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          password?: string | null
          post_id?: number
          writer?: string
        }
        Relationships: [
          {
            foreignKeyName: "comment_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comment_writer_fkey"
            columns: ["writer"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          }
        ]
      }
      post: {
        Row: {
          board_id: number | null
          content: string | null
          created_at: string
          id: number
          title: string | null
          view: number | null
          writer: string
        }
        Insert: {
          board_id?: number | null
          content?: string | null
          created_at?: string
          id?: number
          title?: string | null
          view?: number | null
          writer: string
        }
        Update: {
          board_id?: number | null
          content?: string | null
          created_at?: string
          id?: number
          title?: string | null
          view?: number | null
          writer?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_writer_fkey"
            columns: ["writer"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          name: string | null
          point: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          name?: string | null
          point?: number | null
          user_id?: string
        }
        Update: {
          created_at?: string
          name?: string | null
          point?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      post_view_increment: {
        Args: {
          x: number
          row_id: number
        }
        Returns: undefined
      }
      user_point_increment: {
        Args: {
          x: number
          row_id: string
        }
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
