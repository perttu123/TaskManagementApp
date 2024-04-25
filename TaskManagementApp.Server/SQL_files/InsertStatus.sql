USE [TaskDBBB];

IF NOT EXISTS (SELECT 1 FROM [dbo].[Status])
BEGIN
    -- Insert data into Status table
    INSERT INTO [dbo].[Status] ([Name], [Theme])
    VALUES
        ('New', 1),
        ('In progress', 2),
        ('Done', 3),
        ('Cancelled', 4);
END
ELSE
BEGIN
    PRINT 'Status table already contains data. Skipping insertion.';
END;
