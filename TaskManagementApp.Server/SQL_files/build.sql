-- Check if the database exists
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TaskDBBB')
BEGIN
    -- Create the database
    CREATE DATABASE TaskDBBB;
END
ELSE
BEGIN
    PRINT 'TaskDBBB database already exists.';
END;

-- Use the TaskDBBB database
USE TaskDBBB;

-- Create the Status table
CREATE TABLE [dbo].[Status](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](max) NOT NULL,
    [Theme] [int] NULL,
    CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )
);

-- Create the Tag table
CREATE TABLE [dbo].[Tag](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](max) NOT NULL,
    [Theme] [int] NULL,
    CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )
);

-- Create the Task table
CREATE TABLE [dbo].[Task](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Content] [nvarchar](max) NULL,
    [StartDate] [datetime] NULL,
    [EndDate] [datetime] NULL,
    [TagId] [int] NULL,
    [StatusId] [int] NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    ),
    CONSTRAINT [FK_Task_Tag] FOREIGN KEY([TagId]) REFERENCES [dbo].[Tag] ([Id]),
    CONSTRAINT [FK_Task_Status] FOREIGN KEY([StatusId]) REFERENCES [dbo].[Status] ([Id])
);

