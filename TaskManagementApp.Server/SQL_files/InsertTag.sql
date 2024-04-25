USE [TaskDBBB];

IF NOT EXISTS (SELECT 1 FROM [dbo].[Tag])
BEGIN
    -- Insert data into Tag table
    INSERT INTO [dbo].[Tag] ([Name], [Theme])
    VALUES
        ('Sport', 1),
        ('Course', 2),
        ('Work', 3);
END
ELSE
BEGIN
    PRINT 'Tag table already contains data. Skipping insertion.';
END;
